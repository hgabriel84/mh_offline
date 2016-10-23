var page = $('.page');
var home = $('#home');
var inForm = $('#form');
var inFormPassword = $('#form_password');
var inName = $('#in_name');
var inEmail = $('#in_email');
var inPosition = $('#in_position');
var inCountry = $('#in_country');
var inPassword = $('#in_password');
var vdEplanning = $('#vd_eplanning');
var vdWeekend = $('#vd_weekend');
var pagenameEplanning = 'eplanning';
var pagenameWeekendVideo = 'weekend_video';
var pagenameExport = 'export';
var btExportCSV = $('#bt_export_csv');
var btReset = $('#bt_reset');
var btPassword = $('#bt_password');
var btGenerateWinner = $('#bt_generate_winner');
var uiExportPassword = $('#export_password');
var uiExportContent = $('#export_content');
var uiWinner = $('#lb_winner');

$(function() {
  //set localStorage
  if (!localStorage.contacts) {
    localStorage.contacts = JSON.stringify([]);
  }

  config();

	page.hide();
	home.show();
});

function config() {
  //export contacts to csv file
  btExportCSV.click(function(e) {
    if (localStorage.contacts) {
      JSONToCSVConvertor(localStorage.contacts, "contacts", true);
    }
  });

  // delete data
  btReset.click(function(e) {
    localStorage.contacts = JSON.stringify([]);
  });

  // validate password and show export interface
  btPassword.click(function(e) {
    e.preventDefault();
    inFormPassword.submit();
    var password = inPassword.val();
    if(password == "mercurius") {
      uiExportContent.show();
      uiExportPassword.hide();
    }
    inPassword.val("");
  });

  // generate a random winner
  btGenerateWinner.click(function(e) {
    e.preventDefault();
    if(localStorage.contacts) {
      var contacts = JSON.parse(localStorage["contacts"]);
      if(contacts.length > 0) {
        var max = contacts.length - 1;
        var winner = contacts[getRandomInt(0, max)];
        uiWinner.html('WINNER:<br/>' + winner.name + '<br/>' + winner.email + '<br/>' + winner.position + '<br/>' + winner.country);
      }
    }
  });
}

function show(id) {
	page.hide();
	$('#' + id).show();

  stopVideos();

  if(id == pagenameEplanning) {
    startVideoEplanning();
  }

  if(id == pagenameWeekendVideo) {
    startVideoWeekend();
  }

  if(id == pagenameExport) {
    uiExportPassword.show();
    uiExportContent.hide();
  }
}

function startVideoEplanning() {
  vdEplanning[0].src = "https://www.youtube.com/embed/wgFKdVVjh3I?enablejsapi=1&controls=0&autoplay=1&modestbranding=1";
}

function startVideoWeekend() {
  vdWeekend[0].src = "https://www.youtube.com/embed/wgFKdVVjh3I?enablejsapi=1&controls=0&autoplay=1&modestbranding=1";
}

function stopVideos() {
  vdEplanning[0].src = "";
  vdWeekend[0].src = "";
}

// prevent submit of form with user data
inForm.submit(function(event) {
  event.preventDefault();
});

// prevent submit of form with password
inFormPassword.submit(function(event) {
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

    var contacts = JSON.parse(localStorage["contacts"]);
    contacts.push(contact);
    // save contacts at localStorage
    localStorage["contacts"] = JSON.stringify(contacts);

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
    in_name: {
      required: true
    },
    in_email: {
      required: true
    },
    in_position: {
      required: true
    },
    in_country: {
      required: true
    },
  }
});

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  var CSV = '';

  CSV += ReportTitle + '\r\n\n';

  if (ShowLabel) {
    var row = "";
    for (var index in arrData[0]) {
      row += index + ',';
    }
    row = row.slice(0, -1);
    CSV += row + '\r\n';
  }

  for (var i = 0; i < arrData.length; i++) {
    var row = "";
    for (var index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }
    row.slice(0, row.length - 1);
    CSV += row + '\r\n';
  }

  if (CSV == '') {
    alert("Invalid data");
    return;
  }

  var fileName = ReportTitle;
  var uri = 'data:application/octet;charset=utf-8,' + escape(CSV);
  //window.location.href = uri;
  
  var link = document.createElement("a");
  link.href = uri;
  //link.style = "visibility:hidden";
  link.download = fileName + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
