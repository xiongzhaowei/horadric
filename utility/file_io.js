function importFile(input){
	//console.log(window.FileReader,typeof window.ActiveXObject,document.implementation,document.implementation.createDocument);
	//直接读取.d2s文件，新浏览器不支持VBS，改成JS实现
	//chrome、IE10/11、FF也可
	var hexStr = "";

	if (window.FileReader){
		var fileURL = input.files[0];
		hexStr = ReadHexFromFile(fileURL);
	}
	/*/老IE不支持H5、高版本ES
	https://www.cnblogs.com/vicky-li/p/10030832.html
	http://c.biancheng.net/view/5995.html
	https://www.cnblogs.com/xiaocaiyuxiaoniao/p/8324543.html
	https://www.cnblogs.com/yaotome/p/9002172.html
	*/
	else if (typeof window.ActiveXObject != 'undefined') {
		alert('如何开启ADODB.STREAM请自行搜索。\n如果此网页在服务器上，无权打开文件，请下载到本地运行。\n\nIE9以下太古老。请用现代浏览器（支持HTML5和新版ES）。');
		var fileURL=input.value;
		/* /网页不在本地，则input.value = fakepath\file
		//https://cloud.tencent.com/developer/article/1691670，这样能得到真实路径
		input.select();
		input.blur();	//IE9
		fileURL=document.selection.createRange().text //*/
		hexStr = AdodbReadHexFromFile(fileURL);
	}
	//支持FF未写，貌似前述Chrome代码也能工作
	else if (document.implementation && document.implementation.createDocument) {
		alert('FireFox代码尚未完成！');
	} else {
		alert('浏览器不支持，请自行导入HEX数据！');
	}
	document.import_sheet.hex_data.value = hexStr;	//未换行，不影响导入
	if (window.FileReader) importing();
}

//將Uint8Array保存為二進製文件, https://code-examples.net/zh-TW/q/182e049
function saveD2s(hex_dum,fileName){
	//H5，改回create_data()@main.js
	if (window.FileReader){
		var bin = new Uint8Array(hex_dum.length/2);
		for (var i=0;i<hex_dum.length;i+=2){
			bin[i/2]=parseInt('0x'+hex_dum.substr(i,2));
		}
		//console.log(bin);
		blob = new Blob([bin]);			//删除，默认MIME类型,{type: 'application/octet-stream'});
		var url=URL.createObjectURL(blob);
		downloadURL(url, fileName);		//为什么blob保存后是10进制数字符串？必须写[bin]……
		setTimeout(function(){return URL.revokeObjectURL(url);}, 1000);
	}
}
 function downloadURL(data,fileName){
	var a;
	a = document.createElement('a');
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = 'display: none';
	a.click();
	a.remove();
};

//使用ActiveX，要求浏览器开启相应功能和安全设置
function AdodbReadHexFromFile(fileURL){
	var binStr, hexStr="";

	/* /FSO方式获得 binStr,编码属性只有三种，ANSI、Unicode、ASCII，会少掉跳过的非打印字符？且需要处理多字节字符。
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var file = fso.OpenTextFile(fileURL, 1);
		binStr = file.ReadAll();
	file.Close();	 //*/

	//ADODB方式，需启用：https://www.cnblogs.com/weiweictgu/archive/2007/03/02/661940.html
	var inStream = new ActiveXObject("ADODB.Stream");
		inStream.Type = 2;	//adTypeBinary = 1,2为Text
		inStream.Open();
		//Latin1(Windows-1252):ISO-8859-1)单字节完全编码
		inStream.CharSet = "iso-8859-15";
		//转换结果iso-8859-15比iso-8859-1更接近原数据？更少收录Unicode中的多字节符号。
		inStream.LoadFromFile(fileURL);
		//Read()读取为二进制数组，可--结果typeof=unknown.WHY.?.所以用ReadText变通...
		binStr = inStream.ReadText();
		inStream.Close();
		inStream = null;

	//binStr2HEX
	//https://www.codeproject.com/articles/17825/reading-and-writing-binary-files-using-jscript
	var ISO885915=[8364,352,353,381,382,338,339,376];		//Latin0单字节集中包含的Unicode字符编码
	var HexOrg=['A4','A6','A8','B4','B8','BC','BD','BE'];	//上述字符Latin0真实16进制值，由比较而来，437/Latin1同理可得
	var isoCheckNum=ISO885915.length;
	for (var i=0 ; i<binStr.length ; i++) {
		var curCode=binStr.charCodeAt(i);
		//charCodeAt可能会解释成多字节，有字符会被错误转换，如'€'，无视CharSet LatinX
		//因JavaScript引擎内部，所有字符都用 Unicode 表示
		var s,isUnicode=false;
		if(curCode>=256){
			var j;		//IE8不支持indexOf()
			for(j=0;j<isoCheckNum;j++) if(curCode==ISO885915[j]) break;
			if(j<isoCheckNum) isUnicode=true;
		}
		if(isUnicode) s=HexOrg[j];	//查表将Unicode字符转换回正确的单字节16进制
		else{
			s= '0' + curCode.toString(16).toUpperCase();
			//确保是两位数的HEX
			var bytes = 2;
			//var bytes=Math.floor(s.length/2)*2;			//多字节内容处理
			s = s.substr(s.length - bytes, bytes);
		}
		hexStr += s;
	}
	return hexStr;
}
//使用FileReader，要求浏览器支持
function ReadHexFromFile(fileURL){
	var reader = new FileReader();
	var hexStr = "";
	reader.onloadend = function() {
		//异步操作，完成事件代码
		bin = new Uint8Array(this.result);
		for (var i=0;i<bin.length;i++) {	//for...of为ES6标准
			var s = '0' + parseInt(bin[i]).toString(16);
			//确保是两位数的HEX
			s = s.substr(s.length - 2, 2);
			hexStr += s.toUpperCase();
		}
		return hexStr;
	}
	reader.readAsArrayBuffer(fileURL);
}
