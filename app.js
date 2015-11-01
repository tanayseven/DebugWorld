var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var IssueController = new require('./src/issue_controller');
var ic = new IssueController();

var app = express();

var port = Number(process.env.PORT || 5000);

app.set('views',__dirname+'/views/');
app.set('view engine','jade');
app.engine('jade', require('jade').__express);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/phone_files/'));

var reply = function(res, i) {
  res.header("Access-Control-Allow-Origin", "*"); res.send(i);
};

app.get('/', function (req, res) {
  console.log("Received / request");
  res.send('Hello World');
});

app.post('/save_issue', function (req,res) {
  console.log("saving issue...");
  ic.save_issue(req.body, function (i) {reply(res,i);});
});

app.get('/fetch_issue',function (req,res) {
  console.log('Fetching issue...');
  ic.fetch_issue(req.query.id,function(i){reply(res, i);});
});

app.get('/fetch_issues', function (req, res) {
  console.log("Debug Fetch");
  ic.fetch_issues(function(i){reply(res, i);});
});

app.post('/vote', function (req, res) {
  console.log("Vote");
  ic.vote_issue(req.body,function(i){reply(res, i);});
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Debug World at http://%s:%s', host, port);
});
