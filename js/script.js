var page = $('.page');
var home = $('#home');
var inForm = $('#form');
var inName = $("#inputName");
var inEmail = $("#inputEmail");
var inPosition = $("#inputPosition");
var inCountry = $("#inputCountry");
var vd_eplanning = $('#vd_eplanning');
var vd_weekend = $('#vd_weekend');
var pagename_eplanning = 'eplanning';
var pagename_weekend_video = 'weekend_video';

$(function() {
	page.hide();
	home.show();
});

function show(id) {
	page.hide();
	$('#' + id).show();

  stopVideos();

  if(id == pagename_eplanning) {
    startVideoEplanning();
  }

  if(id == pagename_weekend_video) {
    startVideoWeekend();
  }
}

function startVideoEplanning() {
  vd_eplanning[0].src = "https://www.youtube.com/embed/wgFKdVVjh3I?enablejsapi=1&controls=0&autoplay=1&modestbranding=1";
}

function startVideoWeekend() {
  vd_weekend[0].src = "https://www.youtube.com/embed/wgFKdVVjh3I?enablejsapi=1&controls=0&autoplay=1&modestbranding=1";
}

function stopVideos() {
  vd_eplanning[0].src = "";
  vd_weekend[0].src = "";
}

// prevent submit of form with user data
inForm.submit(function(event) {
  event.preventDefault();
});

// save user data at localStorage with json
function save() {
  inForm.submit();
  if (inForm.valid()) {
    //input user data
    var name = inName.val();
    name = name.substring(name.indexOf('=') + 1);
    var email = inEmail.val();
    email = email.substring(email.indexOf('=') + 1);
    var position = inPosition.val();
    position = position.substring(position.indexOf('=') + 1);
    var country = inCountry.val();
    country = country.substring(country.indexOf('=') + 1);

    //save user data
    var contact = new Object();
    contact.name = name;
    contact.email = email;
    contact.position = position;
    contact.country = country;

/*
    var contacts = JSON.parse(localStorage["contacts"]);
    contacts.push(contact);
    // save contacts at localStorage
    localStorage["contacts"] = JSON.stringify(contacts);
*/

    //clear input data
    inName.val("");
    inEmail.val("");
    inPosition.val("");
    inCountry.val("");

    page.hide();
    home.show();
  }
}

inForm.validate({
  rules: {
    inputName: {
      required: true
    },
    inputEmail: {
      required: true
    },
    inputPosition: {
      required: true
    },
    inputCountry: {
      required: true
    },
  }
});