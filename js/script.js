$(function() {
	$('.page').hide();
	$('#home').show();
});

function show(id) {
	$('.page').hide();
	$('#' + id).show();
}