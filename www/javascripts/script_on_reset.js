
//reset1.html
var time = 0;
function setVerBtn(){
	if (time == 0) {
		$('#verBtn').html('再次发送');
	}
	else{
		$('#verBtn').html('再次发送(' + time +')');
		time--;
		setTimeout("setVerBtn()" , 1000);
	}
}

function userCheck(){
	//verify process
	var user = $('#usr_name').val(),
		ver = $('#ver').val();
		if (user.length < 11) alert_flash("请输入11位手机号码")
		//else if (ver.length == 0) alert_flash("请输入验证码");
		else //if (ver) 
		{
			localStorage.reset_phone = user;
			ctrl.move("reset2.html", true);
		}
	//
}

function veriCheck(){
	var phone = $('#usr_name').val();
	if (time != 0) return;
	if (phone.length == 0) alert_flash("请输入手机号");
	else if (phone.length < 11) alert_flash("手机号为11位");
	else {
		//send verify code...
		//if (true) {
		//	time = 60;
		//	setTimeout("setVerBtn()" , 1000)
		//}
			
	}
}

//reset2.html
var apiAddress = "http://120.24.223.82:8080/Crossover/Api/";

function pwdCheck () {
	var pwd = $('#pwd'), pwdr = $('#pwdr');
	if (pwd.val()==""){
		alert_flash("密码不能为空");
	}
	else if (pwd.val()!=pwdr.val()) {
		alert_flash("密码不符");
		pwd.val("");	pwdr.val("");
		}
		else {
			var pwd = $.base64.btoa(des("isalways", pwd.val(), 1, 0, "", 1));
			json = JSON.stringify(
				{'Phone':localStorage.reset_phone,
				'Password':pwd,
				'type': localStorage.reset_type
				});
			//console.log(json);
			$.ajax({
				type:'post',
				url: apiAddress+'user/changePwd',
				contentType: 'application/json',
				dataType:'json',
				data:json,
				success:function(data){
					console.log(data);
					if (data.success){
						alert_flash("修改成功");
						window.location.href = "index.html"
					}
					else {
						alert_flash("修改失败");
						ctrl.move("reset.html", false);
					}
						
				}
			})
		}
}