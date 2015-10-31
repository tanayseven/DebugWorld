var getJSON = function(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status == 200) {
				resolve(xhr.response);
			} else {
				reject(status);
			}
		};
		xhr.send();
	});
};
/*
getJSON('http://localhost/issue1.json').then(function(json) {
	var data = json.result;
}, function(status) {
	alert('Something went wrong.');
});
*/

var html = "";

document.getElementById("issueId").innerText = data.id;
document.getElementById("issueTitle").innerText = data.name;
document.getElementById("creatorUsername").innerText = data.creator_username;
document.getElementById("issueDateCreated").innerText = data.dateCreated;
document.getElementById("issueDescription").innerText = data.description;
document.getElementById("issueCity").innerText = data.location.city;
document.getElementById("issueCountry").innerText = data.location.country;
document.getElementById("issueVotesUp").innerText = data.votes.up;
document.getElementById("issueVotesDown").innerText = data.votes.down;

html = "";
for (var i = 0; i < data.tags.length; ++i) {
	if (i != 0)
		html += ", ";
	html += "<a href=\"#" + data.tags[i].id + "\">" + data.tags[i].value + "</a>";
}
document.getElementById("issueTags").innerHTML = html;

html = "";
for (var i = 0; i < data.comments.length; ++i) {
	html += "<article class=\"uk-comment uk-panel-box " + (data.comments[i].creator_id == data.creator_id ? "uk-panel-box-primary" : "") + " uk-margin-bottom\"> \
				<header class=\"uk-comment-header\"> \
					<h4 class=\"uk-comment-title\">" + data.comments[i].creator_username + "</h4> \
					<div class=\"uk-comment-meta\">" + data.comments[i].dateCreated + " | #" + data.comments[i].id + "</div> \
				</header> \
				<div class=\"uk-comment-body\">" + data.comments[i].comment + "</div> \
			</article>";
}
document.getElementById("issueComments").innerHTML = html;