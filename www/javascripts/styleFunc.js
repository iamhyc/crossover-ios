function alert_flash(message){
	var ndiv = "<div id='alert_flash'>" + message + "</div>";
	$("body").append(ndiv);
	$("#alert_flash").css({
		"top" : "90%",
		"left" : "35%"
	}).show(2000);
	setTimeout("$('#alert_flash').fadeOut(3000).remove()", 3000);
}