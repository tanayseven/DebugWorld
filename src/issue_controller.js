var connString = process.env.DB_CONN_STRING || 'mongodb://127.0.0.1:27017/debugworld';
var mongo = require('mongodb');
var db = require('monk')(connString);

function IssueController(){
  this.issue = db.get('issue');
  if (this.db) {
    console.log('Connected successfully');
  }
}

IssueController.prototype.save_issue = function(data,callback) {
  console.log('Reached saving');
  this.issue.insert(data,function (err,doc) {
    if (err) throw err;
    callback({success:'true'});
    console.log('Got it!');
  });
};

IssueController.prototype.fetch_issue = function (id,callback) {
  id = id.toString();
  this.issue.find({_id:id},function (err,docs) {
    if (err) throw err;
    callback(docs);
  });
};

IssueController.prototype.vote_issue = function (data,callback) {
  var id = data._id.toString();
  var up = (data.up === 'true');
  var res = {success:'false'};
  console.log("id" + id + ' ' + "up" + up);
  if (up)
  {
    this.issue.findAndModify({
      query: {_id:id},
      update: { $inc: {"votes.up":1}}},
      function (err,docs) {
        if (err) throw err;
        callback({success:'true'});
      }
    );
  } else {
    this.issue.findAndModify({
      query: {_id:id},
      update: { $inc: {"votes.down":1}}},
      function (err,docs) {
        if (err) throw err;
        callback({success:'true'});
      }
    );
  }
};

IssueController.prototype.fetch_issues = function (callback) {
  this.issue.find({}, 'name dateCreated votes', function (err, docs) {
    if (err) throw err;
    callback(docs);
  });
};

module.exports = IssueController;
