var BING_key = "dP52B8BTBS36jgN6zNkk~CL_6KiRVf5NoTV_oOCAFbg~Ak_VUTbKMiNKir1o7S6L21-muFg8krWz2r7J697vvxNYGvoAH7Ne4U9n8_HawBiF";

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
			document.getElementById("spinMessage").className = "uk-hidden";
		};
		xhr.send();
	});
};

function CallRestService(request) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    document.body.appendChild(script);
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

var query = getQueryParams(document.location.search);

//*
getJSON('http://debugworld.herokuapp.com/fetch_issue?id=' + query.id).then(function(json) {
	var data = json[0];
	var html = "";

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

	showMap(data.location.latitude, data.location.longitude);
}, function(status) {
	document.getElementById("errorMessage").className = "uk-width-9-10 uk-container-center";
	document.getElementById("pageContent").className = "uk-hidden";
	document.getElementById("spinMessage").className = "uk-hidden";
});
//*/



/*
 * Maps
 */

var showMap = function(latitude, longitude) {
	var map = new Microsoft.Maps.Map(document.getElementById("issueLocation"), 
	{
		credentials: BING_key,
		center: new Microsoft.Maps.Location(latitude, longitude),
		mapTypeId: Microsoft.Maps.MapTypeId.road,
		zoom: 16,
	});

	var center = map.getCenter();
	var pin = new Microsoft.Maps.Pushpin(center, {icon: 'img/pin.png', width: 22, height: 38, draggable: false}); 

	map.entities.push(pin);
	document.getElementById("pageContent").className = "uk-width-9-10 uk-container-center";
	document.getElementById("spinMessage").className = "uk-hidden";
}


/*
var getCityAndCountry = function(latitude, longitude, a) {
	var url = "http://dev.virtualearth.net/REST/v1/Locations/" + latitude + "," + longitude + "?o=json&jsonp=GeocodeCallback&key=" + BING_key;
	CallRestService(url);
}

var a = {"city":null, "country":null};

function GeocodeCallback(json) {
	var data = json.resourceSets[0].resources[0].address;
	a.country = data.countryRegion;
	a.city = data.locality;
	console.log(a);
}

getCityAndCountry(data.location.latitude, data.location.longitude);
*/

/*
 * Votes
 */

var vote = function(voteUp) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://debugworld.herokuapp.com/vote', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("_id=" + query.id + "&up=" + voteUp);
}