var page = $('.page');
var pagenameHome = 'home';
var pagenameEplanning = 'eplanning';
var pagenameWeekendVideo = 'weekend_video';
var pagenameExport = 'export';
var pagenameTopics = 'topics';
var inForm = $('#form');
var inFormPassword = $('#form_password');
var inFormTopics = $('#form_topics');
var inName = $('#in_name');
var inEmail = $('#in_email');
var inPosition = $('#in_position');
var inInstitution = $('#in_institution');
var inCountry = $('#in_country');
var inPassword = $('#in_password');
var cbEplanning = $('#cb_eplanning');
var cbCommissioning = $('#cb_commissioning');
var cbTraining = $('#cb_training');
var cbQuality = $('#cb_quality');
var cbSupport = $('#cb_support');
var vdEplanning = $('#vd_eplanning');
var vdWeekend = $('#vd_weekend');
var btExportCSV = $('#bt_export_csv');
var btReset = $('#bt_reset');
var btPassword = $('#bt_password');
var btGenerateWinner = $('#bt_generate_winner');
var uiExportPassword = $('#export_password');
var uiExportContent = $('#export_content');
var uiWinner = $('#lb_winner');
var contact;

$(function() {
  //set localStorage
  if (!localStorage.contacts) {
    localStorage.contacts = JSON.stringify([]);
  }

  config();
  show(pagenameHome);
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
        uiWinner.html('WINNER:<br/>' + winner.name + '<br/>'
                                     + winner.email + '<br/>'
                                     + winner.position + '<br/>'
                                     + winner.institution + '<br/>'
                                     + winner.country);
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
  vdEplanning[0].src = "https://www.youtube.com/embed/0NBN6inxHZc?enablejsapi=1&autoplay=1&modestbranding=1&rel=0";
}

function startVideoWeekend() {
  vdWeekend[0].src = "https://www.youtube.com/embed/-qdjAbRwJ3Q?enablejsapi=1&autoplay=1&modestbranding=1&rel=0";
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

// prevent submit of form with topics
inFormTopics.submit(function(event) {
  event.preventDefault();
});

// save user data
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
    var institution = inInstitution.val();
    institution = institution.substring(institution.indexOf('=') + 1);
    var country = inCountry.val();
    country = country.substring(country.indexOf('=') + 1);

    //save user data
    contact = new Object();
    contact.name = name;
    contact.email = email;
    contact.position = position;
    contact.institution = institution;
    contact.country = country;

    //clear input data
    inName.val("");
    inEmail.val("");
    inPosition.val("");
    inInstitution.val("");
    inCountry.val("");

    show(pagenameTopics);
  }
}

// save user topics and user data at localStorage with json
function saveTopics() {
  inFormTopics.submit();
  var eplanning = cbEplanning.is(':checked') ? 'x' : '';
  var commissioning = cbCommissioning.is(':checked') ? 'x' : '';
  var training = cbTraining.is(':checked') ? 'x' : '';
  var quality = cbQuality.is(':checked') ? 'x' : '';
  var support = cbSupport.is(':checked') ? 'x' : '';

  contact.eplanning = eplanning;
  contact.commissioning = commissioning;
  contact.training = training;
  contact.quality_assessment = quality;
  contact.operational_go_live_support = support;

  var contacts = JSON.parse(localStorage["contacts"]);
  contacts.push(contact);
  // save contacts at localStorage
  localStorage["contacts"] = JSON.stringify(contacts);

  //clear checkboxes
  $(":checkbox").prop('checked', false);

  show(pagenameHome);
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
    in_institution: {
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

  var uri = 'data:text/plain;charset=ISO-8859-1,' + escape(CSV);
  window.open(uri);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
