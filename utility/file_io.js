<!--
function importFile(input){
	console.log(window.FileReader,typeof window.ActiveXObject,document.implementation,document.implementation.createDocument);
	//直接读取.d2s文件，新浏览器不支持VBS，改成JS实现
	//chrome、IE10/11、FF也可
	if (window.FileReader){
		var file = input.files[0];
		var reader = new FileReader();
		reader.onloadend = function() {
			//异步操作，完成事件代码
			bin = new Uint8Array(this.result);
			hexStr = "";
			for (var i=0;i<bin.length;i++) {	//for...of为ES6标准
				var s = '0' + parseInt(bin[i]).toString(16);
				//确保是两位数的HEX
				s = s.substr(s.length - 2, 2);
				hexStr += s.toUpperCase();
			}
			document.import_sheet.hex_data.value = hexStr;	//未换行，不影响导入
			importing();
		}
		reader.readAsArrayBuffer(file);
	}
	//老IE不支持H5，暂未写
	/*/https://www.cnblogs.com/vicky-li/p/10030832.html
	http://c.biancheng.net/view/5995.html
	https://www.cnblogs.com/xiaocaiyuxiaoniao/p/8324543.html
	https://www.cnblogs.com/yaotome/p/9002172.html
	*/
	else if (typeof window.ActiveXObject != 'undefined') {
		/*/网页不在本地，则input.value = fakepath\file，又没有H5的FileReader...
		//https://cloud.tencent.com/developer/article/1691670，这样能得到真实路径
		input.select();
		input.blur();	//IE9
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var file = fso.OpenTextFile(document.selection.createRange().text, 1); //*/
		var file = fso.OpenTextFile(input.value, 1);
		var content = file.ReadAll();
		file.Close();
		hexStr = "";
		for (var i=0;i<content.length;i++) {
			var s= '0' + content.charCodeAt(i).toString(16);	//charCodeAt会读取双字节，且跳过非可见字符？
			//确保是两位数的HEX
			var bytes=Math.floor(s.length/2)*2;
			s = s.substr(s.length - bytes, bytes);
			hexStr += s.toUpperCase();
		}
		document.import_sheet.hex_data.value = hexStr;		//*/
		alert('如果此网页在服务器上，无权打开文件，请下载到本地运行。\n即使下载运行，也不支持二进制文件读取，请用WinHEX类软件！\n\n生成的16进制数据仅供娱乐，无法导入为存档……\n\nIE9以下太古老。请用现代浏览器，以上问题全部搞定。');
	}
	//支持FF未写，貌似前述Chrome代码也能工作
	else if (document.implementation && document.implementation.createDocument) {
		alert('FireFox代码尚未完成！');
	} else {
		alert('浏览器不支持，请自行导入HEX数据！');
	}
}

//將Uint8Array保存為二進製文件, https://code-examples.net/zh-TW/q/182e049
function saveD2s(hex_dum,fileName){
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
//-->