var connString = process.env.DB_CONN_STRING || 'mongodb://127.0.0.1:27017/debugworld';
var mongo = require('mongodb');
var db = require('monk')(connString);

function IssueController(){
  this.issue = db.get('issue');
  if (this.db) {
    console.log('Connected successfully');
  }
}

IssueController.prototype.save_issue = function(data) {
  this.issue.insert(data,function (err,doc) {
    if (err) throw err;
  });
};

IssueController.prototype.fetch_issue = function (id,callback) {
  id = id.toString();
  console.log(id);
  this.issue.find({_id:id},function (err,docs) {
    if (err) throw err;
    callback(docs);
  });
};

module.exports = IssueController;