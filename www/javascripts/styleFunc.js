function alert_flash(message, callback){
	var ndiv = "<div id='alert_flash'>" + message + "</div>";
	if (!$('#alert_flash').length) {
		$("body").append(ndiv);
		$("#alert_flash").css("width", message.length*25+"px");
		$("#alert_flash").show(1500);
		setTimeout("$('#alert_flash').fadeOut(500, function(){this.remove()})", 2500);
		}
	if (callback) return callback();
}

function alert_modal (message, callback) {
	// body...
}

function prompt_modal (type) {
	// Type 0 : Confirming
}