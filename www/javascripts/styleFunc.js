function alert_flash(message){
	var ndiv = "<div id='alert_flash' style='color:#000000'>" + message + "</div>";
	if (!$('#alert_flash').length) {
		$("body").append(ndiv);
		$("#alert_flash").css("width", message.length*20+"px");
		$("#alert_flash").show(2000);
		setTimeout("$('#alert_flash').fadeOut(1000, function(){this.remove()})", 3000);}
}