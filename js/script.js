var page = $('.page');
var home = $('#home');
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
    startVideo(vd_eplanning);
  }

  if(id == pagename_weekend_video) {
    startVideo(vd_weekend);
  }
}

function startVideo(vd) {
  vd[0].play();
}

function stopVideos() {
  $('video').each(function () { this.pause(); this.currentTime = 0; });
}