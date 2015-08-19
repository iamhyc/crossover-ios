//register.html
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
		/*else if (ver.length == 0) alert_flash("请输入验证码");*/
	else /*if (ver)*/ {
		localStorage.reg_phone = user;
		ctrl.move("register2.html", true);
	}
}

function veriCheck(){
	var phone = $('#usr_name').val();
	if (time != 0) return;
	if (phone.length == 0) alert_flash("请输入手机号");
	else if (phone.length < 11) alert_flash("手机号为11位");
	else {
		//send verify code...
		if (true) {
			time = 60;
			setTimeout("setVerBtn()" , 1000)
		}		
	}
}


//register2.html
var readingFlag = true;
function preview(){
	var file = this.files[0]; 
	var reader = new FileReader(); 
	reader.readAsDataURL(file);
	/* */ 
	reader.onload = function(e) {
		$('#upload').attr('src', this.result);
		localStorage.reg_PhotoBase64 = this.result.slice(this.result.indexOf(',')+1);
		console.log(this.result);
	}
	reader.onloadend = function() {
		readingFlag = false;
	}
}

function imgCheck () {
	var cityName = $('#cityName').val(),
		teamName = $('#teamName').val();
	if (!teamName) alert_flash('请输入战队名称')
	else if (!cityName) alert_flash('请输入城市')//to 加特技
	else if (!document.getElementById('imgFile').value) alert_flash("请上传战队队标")
	else {
		localStorage.reg_cityName = cityName;
		localStorage.reg_teamName = teamName;
		console.log(localStorage.reg_PhotoBase64);
		ctrl.move("register3.html", true);
	}
}

//register3.html
var apiAddress = "http://120.24.223.82:8080/Crossover/Api/";
function pwdCheck () {
	var t1 = $('#pwd1'), tr1 = $('#pwdr1'),
		t2 = $('#pwd2'), tr2 = $('#pwdr2');
	if (t1.val()==""||t2.val()==""){
		alert_flash("密码不能为空");
	}
	else if (t1.val()!=tr1.val()) {
		alert_flash("管理员密码不符");
		t1.val("");	tr1.val("");
		}
	else if (t2.val()!=tr2.val()){
			alert_flash("队员密码不符");
			t2.val("");	tr2.val("");
		}
	else if (t1.val()==t2.val()) alert_flash("管理员密码和队员密码不能相同")
		else {
			// body...
			var Adpwd = $.base64.btoa(des("isalways", t1.val(), 1, 0, "", 1));
			var pwd = $.base64.btoa(des("isalways", t2.val(), 1, 0, "", 1)),
				json = JSON.stringify({
					'Phone':localStorage.reg_phone,
					'AdminPwd':Adpwd,
					'CommonPwd':pwd,
					'TeamName':localStorage.reg_teamName,
					'City':localStorage.reg_cityName,
					'PhotoBase64':localStorage.reg_PhotoBase64
				});
			//console.log(json);
			$.ajax({
				type:'post',
				url: apiAddress+'user/register',
				contentType: 'application/json',
				dataType:'json',
				data:json,
				success:function(data){
					console.log(data);
					if (data.success){
						alert_flash("成功！");
						window.location.href = "index.html"
					}
					else if (data.success == false){
							if (data.reason == "TeamNameExist"){
								alert_flash("队名已存在");
								ctrl.move("register2.html", false);
							}
							if (data.reason == "PhoneExist"){
								alert_flash("手机已注册");
								ctrl.move("register.html", false);
							}
						}
				
				}
			})
		}
}
