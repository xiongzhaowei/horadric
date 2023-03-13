<!--
var button_non = "#202020";
var bg_color = "";

document.write('<style type="text/css">');

browser = navigator.userAgent;
OS = navigator.platform;

if(browser.indexOf("MSIE") >= 0){
	var main_top = 20;
	if(OS.indexOf("Win") >= 0){
		document.write('TD{font-family:"宋体"; font-size:12px; color:white}');
		document.write('INPUT{font-family:"宋体"; font-size:12px; height:17px; line-height:11px; color:white; background:black url(./gifs/bg2.gif); cursor:crosshair; ime-mode:disabled}');
		document.write('SELECT{font-family:"宋体"; line-height:11px; color:white; background:black url(./gifs/bg2.gif); background-attachment:fixed; cursor:crosshair}');
		document.write('.pull{height:17px; font-size:12px}');
		document.write('.lis{font-size:12px}');
		document.write('.chkbx{height:13px}');
		document.write('.radbt{height:12px}');
		document.write('TEXTAREA{font-size:12px; font-family:"宋体"; ime-mode:disabled; color:white; background:black url(./gifs/bg2.gif); background-attachment:fixed; width:480px; height:100px}');
		width_btn ="width:20px;";
		var BOS_type = 1;
		if (form_resize ==1) self.resizeTo(725,599);
	}
	else{
		document.write('TD{font-family:"宋体"; font-size:12px; color:white}');
		document.write('INPUT{font-family:"宋体"; font-size:12px; height:14px; line-height:14px; color:white; background:black url(./gifs/bg2.gif); cursor:crosshair; ime-mode:disabled}');
		document.write('SELECT{font-family:"宋体"; color:white; background:black url(./gifs/bg2.gif); background-attachment:fixed; cursor:crosshair; border-color:darkgray}');
		document.write('.pull{height:14px; font-size:12px}');
		document.write('.lis{font-size:12px}');
		document.write('.chkbx{height:13px}');
		document.write('.radbt{height:12px}');
		document.write('TEXTAREA{font-size:12px; font-family:"宋体"; ime-mode:disabled; color:white; background:black url(./gifs/bg2.gif); background-attachment:fixed; width:480px; height:100px}');
		width_btn ="width:12px;";
		var BOS_type = 0;
		if (form_resize ==1) self.resizeTo(700,589);
	}
}
else{
	var main_top = 25;
	document.write('TD{font-family:"宋体"; font-size:12px; color:white}');
	document.write('INPUT{font-family:"宋体"; font-size:12px; height:19px; line-height:13px; color:white; background:black url(./gifs/bg2.gif); cursor:crosshair; ime-mode:disabled}');
	document.write('.pull{height:17px}');
	document.write('.lis{}');
	document.write('.chkbx{height:13px; color:black; background:white}');
	document.write('.radbt{height:12px; color:black; background:white}');
	if(browser.indexOf("Camino") >= 0){
		document.write('SELECT{font-family:"宋体"; font-size:12px; line-height:13px; color:black; background:white background-attachment:fixed; cursor:crosshair}');
		document.write('TEXTAREA{font-size:10px; font-family:"Courier"; ime-mode:disabled; color:black; background:white url(./gifs/bg2.gif); background-attachment:fixed; width:480px; height:100px}');
	}else{
		document.write('SELECT{font-family:"宋体"; font-size:12px; line-height:13px; color:white; background:black url(./gifs/bg2.gif); background-attachment:fixed; cursor:crosshair}');
		document.write('TEXTAREA{font-size:10px; font-family:"Courier"; ime-mode:disabled; color:white; background:black url(./gifs/bg2.gif); background-attachment:fixed; width:480px; height:100px}');
	}
	width_btn ="width:19px;";
	var BOS_type = 2;
	if (form_resize ==1) self.resizeTo(690,589);
}

document.write('</style>');
//-->