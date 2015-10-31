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
		xhr.onerror = function() {
			document.getElementById("errorMessage").className = "uk-width-9-10 uk-container-center";
			document.getElementById("pageContent").className = "uk-hidden";
		};
		xhr.send();
	});
};

//*
getJSON('http://debugworld.herokuapp.com/fetch_issues').then(function(data) {
	html = "";
	for (var i = 0; i < data.length; ++i) {
		html += "<tr> \
	                <td><a href=\"issue_details.html?id=" + data[i]._id + "\">" + data[i].name + "</a></td> \
	                <td>" + data[i].dateCreated + "</td> \
	                <td><span class=\"uk-text-success\">" + data[i].votes.up + "</span> / <span class=\"uk-text-danger\">" + data[i].votes.down + "</span></td> \
	            </tr>";
	}
	document.getElementById("issuesList").innerHTML = html;
	document.getElementById("nbIssues").innerText = data.length;
}, function(status) {
	document.getElementById("errorMessage").className = "uk-width-9-10 uk-container-center";
	document.getElementById("pageContent").className = "uk-hidden";
});
//*/
