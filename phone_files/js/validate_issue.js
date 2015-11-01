var BING_key = "dP52B8BTBS36jgN6zNkk~CL_6KiRVf5NoTV_oOCAFbg~Ak_VUTbKMiNKir1o7S6L21-muFg8krWz2r7J697vvxNYGvoAH7Ne4U9n8_HawBiF";

function validateForm() {
	
    var prob_title = document.forms["complaint_register"]["prob_title"].value;
    var prob_desc = document.forms["complaint_register"]["prob_desc"].value;
    var prob_cat=$('input[name="prob_cat"]').is(':checked');

    if(prob_title==null || prob_title=="")
    {
		document.getElementById("prob_title_err").textContent="Please Enter the Problem Title";
		document.getElementById("prob_title").className="uk-form-danger";
		flag=false;
	}
	else
	{
		document.getElementById("prob_title").className="uk-form-success";
		document.getElementById("prob_title_err").textContent="";
	}
	
	if(prob_desc==null || prob_desc=="")
    {
		document.getElementById("prob_desc_err").textContent="Please Enter the Problem Description";
		document.getElementById("prob_desc").className="uk-form-danger";
		flag=false;
	}
	else
	{
		document.getElementById("prob_desc").className="uk-form-success";
		document.getElementById("prob_desc_err").textContent="";
	}

	if(prob_cat==false)
    {
		document.getElementById("prob_cat_err").textContent="Please select one of the category";
		document.getElementById("prob_cat_div").className="uk-form-danger";
		flag=false;
	}
	else
	{
		document.getElementById("prob_cat_div").className="uk-form-success";
		document.getElementById("prob_cat_err").textContent="";
	}

	if(flag==false)
		return false;
	else
		return true;
   
}


function do_assign(latitude,longitude) 
{
	var issueLocation = document.getElementById("issueLocation");
	var img = new Image();
	var l_latitude = document.getElementById("latitude");
	var l_longitude = document.getElementById("longitude");
	l_latitude.innerHTML=latitude; 
    l_longitude.innerHTML = longitude;	
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=16&size=400x400&sensor=true";
    issueLocation.appendChild(img);

	getCityAndCountry(latitude, longitude);

}

var a = {"city":null, "country":null};

function CallRestService(request) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    document.body.appendChild(script);
}

var getCityAndCountry = function(latitude, longitude, a) {
	var url = "http://dev.virtualearth.net/REST/v1/Locations/" + latitude + "," + longitude + "?o=json&jsonp=GeocodeCallback&key=" + BING_key;
	CallRestService(url);
}

function GeocodeCallback(json) {
	var data = json.resourceSets[0].resources[0].address;
	a.country = data.countryRegion;
	a.city = data.locality;
	document.getElementById("city").innerHTML = a.city;
	document.getElementById("country").innerHTML = a.country;
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
		do_assign(position.coords.latitude, position.coords.longitude);
    });
}


function clearfield()
{
	document.getElementById("prob_desc").className="";
	document.getElementById("prob_desc_err").textContent="";
	document.getElementById("prob_title").className="";
	document.getElementById("prob_title_err").textContent="";
	document.getElementById("prob_cat_div").className="";
	document.getElementById("prob_cat_err").textContent="";
	document.getElementById("issueLocation").innerHTML="";
	getLocation();

}