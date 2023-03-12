<!--
if((edit_mode != 0) && (edit_mode != 9)) alert('"preference.js" was broken.\nYou cannot edit anything\neven if HTML loading has done.\nCheck "preference.js".');

//################## Initialize ##################
impo_mode = 9;	//0:v1.10  9:v1.09
//var RUNEBEGIN = 645; //带神符之语标志的装备开始编号。
var VERSION = "Build20230312"

var hex_str = "0123456789ABCDEF";
rev_bit = new Array("0000","1000","0100","1100","0010","1010","0110","1110","0001","1001","0101","1101","0011","1011","0111","1111");
qual_conv = new Array("","白色低级","白色普通","白色高级","蓝色","套装","黄色","暗金","橙色");
location_name = new Array("Stash","Invent","Cube","Belt","Equiped","Equiped","Equiped","Inserted");
sheet_sizeX = new Array(5,9,2,3,0,0,0,0);	//stash,inventory,cube,belt
sheet_sizeY = new Array(7,3,3,3,0,0,0,0);	//stash,inventory,cube,belt
var location_code = "SICBEEEG";
var simple_item = "efghx";

var scr_no0 = 0;
var M_optsheet = 120;	//maximum line number of Magic option sheet
var zero_warnflg = 0;
var pointer = 0;
var last_point = 0;		// = file size
var data_length = 0;	// = letter size
hdata = new Array();	//byte data(dec)
hdata0 = new Array();	//byte data(hex)
var item_puc = "";
var last_glued = 0;		//combine socket item <-> glued item
ar_initial = new Array(-23,-43,-38,-8,-8,-23,-13);
qua_color = new Array("white","white","white","white","royalblue","green","yellow","khaki","darkorange");
var sk_max_lvl = (edit_mode == 9) ? 21 : 100;
var stats_digits = new Array(10,10,10,10,10,8,21,21,21,21,21,21,7,32,25,25);
var merc_ID0 = "";
var wearing0 = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

//======= set Item reminder =======
remindID = new Array();
remindData = new Array();

//======= skill shorts cuts =======
skey_key = new Array("技能1","技能2","技能3","技能4","技能5","技能6","技能7","技能8","技能9","技能10","技能11","技能12","技能13","技能14","技能15","技能16","左手技能1","右手技能1","左手技能2","右手技能2");
skey_ID = new Array();
skey_name = new Array();
skey_item = new Array();
skey_LR = new Array();
all_skill_ID = new Array();
all_skill_name = new Array();
all_skill_item = new Array();
all_skill_max = 60;

for(i = 0; i < 20; i++){
	skey_ID[i] = (-1);
	skey_LR[i] = 0;
	skey_item[i] = 0;
}

for(i = 0; i < all_skill_max; i++){
	all_skill_ID[i] = (-1);
	all_skill_name[i] = "无动作";
	all_skill_item[i] = 0;
}

//======= for Skill Calculation =======
var sk_ID = 0;
var sk_class = 0;
var sk_lvl = 0;
var sk_chc = 0;
var sk_chg0 = 0;
var sk_chg1 = 0;
var sk_name = "";

//======= Mouse Event =======
var pop_x = 0;		//Current pointer X
var pop_y = 0;		//Current pointer Y
var pop_flg = 0;	//Loaded flg

//======= Blink Event =======
var blink_cnt1 = 1;		//blink counter of focus sheet
var blink_cnt2 = 1;		//blink counter of option sheet
var blink_copy = 0;		//copy button
var blink_create = 0;	//create button
var blink_line = (-1);		//line of magic option sheet
var blink_ID1 = null;
var blink_ID2 = null;

//======= Main Item Data =======
item_puckage = new Array();
item_owner = new Array();		//0:Player 1:Mercenary 2:Golem
item_socket = new Array();		//Socket flg
item_socketno1 = new Array();	//Basic Socket number
item_socketno2 = new Array();	//Additional Socket number
item_socketed = new Array();	//Inserted Socket number
item_ethereal = new Array();	//Ethereal flg
item_location = new Array();	//Where the item is located
item_positionX = new Array();	
item_positionY = new Array();
item_typeCD = new Array();		//3char Item CD
item_DBno = new Array();		//item <-> DB
item_unicode = new Array();		//Unique identify CD (maybe random)
item_quality = new Array();		//1:Low 2:Normal 3:Superior 4:Magic 5:Set 6:Rare 7:Unique 8:Crafted
item_lvl = new Array();
item_pictype = new Array();		//Amulet, Ring, Charm, Jewel
item_cspec = new Array();		//Character specific item (ex. amazon only bow)
item_qlvl = new Array();		//Cracked, etc
item_prefix = new Array();		//Prefix CD No. (I use this for Unique CD and so on) 
item_suffix = new Array();		//Suffix CD No.
item_sizeX = new Array();		//colum size
item_sizeY = new Array();		//row size
item_personal = new Array();	//Personalized name
item_def = new Array();			//Defence
item_dur0 = new Array();		//Current Durability
item_dur1 = new Array();		//Maximum Durability
item_quantity = new Array();	//Quntity
item_setno = new Array();		//Set Items have this data
item_color = new Array();
item_deadflg = new Array();		//0:deleted  1:alive
item_glued_no = new Array();	//glued item No.
item_glued_cnt = new Array();	//glued item counter(just only for count up)

var item_cnt = 0;				//number of items
var item_havebox = 0;			//have Horadric Cube or not

//======= Magic Option Data =======
mopt_no = new Array();
mopt_cd = new Array();
mopt_value = new Array();
mopt_bias = new Array();
mopt_name = new Array();

//======= Magial Attribute Category Data Base =======
var mcat_index = "ABCDEFGHIJKLMNOPQSR";
mcat_attr = new Array();
mcat_max = new Array();
mcat_name = new Array();
mcat_name[0] = "速度类"; //A
mcat_name[1] = "物理伤害类"; //B
mcat_name[2] = "元素伤害类"; //C
mcat_name[3] = "特殊伤害类"; //D
mcat_name[4] = "额外加伤类"; //E
mcat_name[5] = "准确率类"; //F
mcat_name[6] = "生命法力精力类"; //G
mcat_name[7] = "抵抗减伤类"; //H
mcat_name[8] = "元素吸收类"; //I
mcat_name[9] = "增加单一技能类"; //J
mcat_name[10] = "增加系列技能类"; //K
mcat_name[11] = "机率施展技能类"; //L
mcat_name[12] = "技能聚气类"; //M
mcat_name[13] = "物品特性类"; //N
mcat_name[14] = "防御类"; //O
mcat_name[15] = "人物值类"; //P
mcat_name[16] = "额外取得类"; //Q
mcat_name[17] = "隐性功能类"; //S
mcat_name[18] = "未定义类"; //R

//======= Item Category Data Base =======
var cat_index = "vyzwDAEFIJKLVMRtPQXYSTUWaZNOcHGBCbdefghijkx";
cat_item = new Array();
cat_max = new Array();
cat_name = new Array();
cat_name[0] = "项链与戒子";
cat_name[1] = "符";
cat_name[2] = "宝石";
cat_name[3] = "赫拉迪克方块";
cat_name[4] = "头环";
cat_name[5] = "头盔";
cat_name[6] = "盔甲";
cat_name[7] = "盾";
cat_name[8] = "手套";
cat_name[9] = "鞋";
cat_name[10] = "腰带";
cat_name[11] = "标枪";
cat_name[12] = "矛";
cat_name[13] = "弓";
cat_name[14] = "十字弓";
cat_name[15] = "箭筒";
cat_name[16] = "斧头";
cat_name[17] = "匕首";
cat_name[18] = "单手剑";
cat_name[19] = "双手剑";
cat_name[20] = "锤";
cat_name[21] = "钺";
cat_name[22] = "权杖";
cat_name[23] = "棍棒";
cat_name[24] = "魔杖";
cat_name[25] = "投掷武器";
cat_name[26] = "亚马逊专用标枪";
cat_name[27] = "亚马逊专用弓";
cat_name[28] = "法师专用水晶";
cat_name[29] = "死灵专用盾";
cat_name[30] = "圣骑士专用盾";
cat_name[31] = "野蛮专用盔";
cat_name[32] = "德鲁依专用盔";
cat_name[33] = "刺客专用爪";
cat_name[34] = "特有武器";
cat_name[35] = "特有物品";
cat_name[36] = "珠宝";
cat_name[37] = "符文";
cat_name[38] = "药剂";
cat_name[39] = "投掷剂品";
cat_name[40] = "耳朵";
cat_name[41] = "钥匙";
cat_name[42] = "册卷";

//################## Reset all forms ##################
function all_reset()
{
	document.stats_sheet.reset();
	document.skill_sheet.reset();
	document.hid_sheet.reset();
	document.focus_sheet.reset();
	document.merc_edit.reset();
	reset_focus();
	chr_name_chk(" "); //标题栏
	item_pickoff();

	pointer = 0;
	last_point = 0;
	data_length = 0;
	hdata = new Array();
	hdata0 = new Array();
	item_puc = "";
	last_glued = 0;
	blink_cnt1 = 1;
	blink_cnt2 = 1;
	blink_copy = 0;
	blink_create = 0;
	blink_line = (-1);
	blink_ID1 = null;
	blink_ID2 = null;
	item_cnt = 0;
	item_havebox = 0;

}

//################## Screen Changer ##################
function scr_change(scr_no)
{
	f_win_man(0);

	for(i = 0; i < 7; i++){
		document.getElementById("screen" + i).style.top = -800;
	}

	document.getElementById("screen" + scr_no).style.top = main_top;
	scr_no0 = scr_no;
}

//################## window name ##################
function chr_name_chk(nameval)
{
	document.title = (nameval.length ? nameval : "Unnamed") + " (Edit Mode: " + ((edit_mode == 0) ? "v1.10" : "v1.09") + ")";
}

//################## floating window preperation ##################
function f_win_prep()
{
	//preperation of skill short cuts window
	document.getElementById("shortcut_win").style.left = 15;
	document.getElementById("shortcut_win").style.top = main_top + 50;

	//preperation of magic select window
	document.getElementById("f_window2").style.left = 20;
	document.getElementById("f_window2").style.top = main_top;

	//preperation of unique select window
	document.getElementById("unique_win").style.left = 20;
	document.getElementById("unique_win").style.top = main_top;

	//preperation of merc and golem window
	document.getElementById("mercgolem_win").style.left = 50;
	document.getElementById("mercgolem_win").style.top = main_top;

	//preperation of item reminder window
	document.getElementById("remind_win").style.left = 20;
	document.getElementById("remind_win").style.top = main_top;

	//preperation of item reminder window
	document.getElementById("item_sel_win").style.left = 20;
	document.getElementById("item_sel_win").style.top = main_top;

	//preperation of import&export window
	document.getElementById("inexport_win").style.left = 80;
	document.getElementById("inexport_win").style.top = 90;

	//preperation of skill selecter
	document.getElementById("skill_selwin").style.left = 20;
	document.getElementById("skill_selwin").style.top = main_top;

	//preperation of multi att win
	document.getElementById("multi_win").style.left = 20;
	document.getElementById("multi_win").style.top = main_top;

	//preperation of batch win
	document.getElementById("batch_sheet").style.left = 80;
	document.getElementById("batch_sheet").style.top = 140;
}

//################## floating window manager ##################
function f_win_man(win_no)
{
	if((win_no != 1) && (win_no != 14)) skill_close();
	if((win_no < 11) || (win_no > 15)) close_batsheet();

	document.getElementById("itemlist_sheet").style.visibility = "hidden";
	document.getElementById("unique_win").style.visibility = "hidden";
	document.getElementById("f_window2").style.visibility = "hidden";
	document.getElementById("remind_win").style.visibility = "hidden";
	document.getElementById("item_sel_win").style.visibility = "hidden";
	document.getElementById("inexport_win").style.visibility = "hidden";
	document.getElementById("prefix_win").style.visibility = "hidden";
	document.getElementById("suffix_win").style.visibility = "hidden";
	document.getElementById("shortcut_win").style.visibility = "hidden";
	document.getElementById("multi_win").style.visibility = "hidden";
	document.getElementById("batch_sheet").style.visibility = "hidden";

	switch(win_no){
	case 0:
		break;
	case 1:
		document.getElementById("skill_selwin").style.visibility = "visible";
		break;
	case 2:
		document.getElementById("itemlist_sheet").style.visibility = "visible";
		break;
	case 3:
		document.getElementById("unique_win").style.visibility = "visible";
		break;
	case 4:
		document.getElementById("f_window2").style.visibility = "visible";
		break;
	case 5:
		document.getElementById("remind_win").style.visibility = "visible";
		break;
	case 6:
		document.getElementById("item_sel_win").style.visibility = "visible";
		break;
	case 7:
		document.getElementById("inexport_win").style.visibility = "visible";
		break;
	case 8:
		document.getElementById("prefix_win").style.visibility = "visible";
		break;
	case 9:
		document.getElementById("suffix_win").style.visibility = "visible";
		break;
	case 10:
		document.getElementById("shortcut_win").style.visibility = "visible";
		break;
	case 11:
		document.getElementById("multi_win").style.visibility = "visible";
		break;
	case 12:
		document.getElementById("batch_sheet").style.visibility = "visible";
		break;
	case 13:
		document.getElementById("f_window2").style.visibility = "visible";
		document.getElementById("batch_sheet").style.visibility = "visible";
		break;
	case 14:
		document.getElementById("skill_selwin").style.visibility = "visible";
		document.getElementById("batch_sheet").style.visibility = "visible";
		break;
	case 15:
		document.getElementById("multi_win").style.visibility = "visible";
		document.getElementById("batch_sheet").style.visibility = "visible";
		break;
	case 16:
		document.getElementById("setitem_win").style.visibility = "visible";
		break;
	}
}

//============================================================================= Importing
//################## IMPORT DATA ##################
function importing()
{
	hex_data0 = document.import_sheet.hex_data.value;
	data_length = hex_data0.length;

	if(item_cnt > 0){
		alert('在导入前请先清除所有的资料(点击"清除所有"按钮重载页面)。');
	}
	else if(data_length < 800){
		alert("请先将存档数据粘贴到文字框内再按导入.");
	}
	else{
		all_reset();
		make_bytedata(hex_data0);
		get_chrstats();
		get_skill();
		if(BOS_type == 1) scr_change(5);
		get_item();
		get_shortcut();
		arcal();
		alert("=== 存档导入成功 ===\n\nData version : " + ((impo_mode == 0) ? "v1.10" : "v1.09") + "\nEdit as : " + ((edit_mode == 0) ? "v1.10" : "v1.09"));
	}
}

//################## pasted data -> byte data ##################
function make_bytedata(hex_data0)
{
	data_length = hex_data0.length;
	var letter_cnt = 0;
	
	while(letter_cnt < (data_length -1 )){
		if(hex_str.indexOf(hex_data0.charAt(letter_cnt)) >=0){
			hdata0[pointer] = hex_data0.substr(letter_cnt++, 2);
			hdata[pointer] = parseInt(hdata0[pointer++], 16);
		}
		letter_cnt++;
	}
	last_point = pointer - 1;

	if(hdata0[4] == "60"){
		impo_mode = 0;
	}else{
		impo_mode = 9;
	}

}

//################## import character stats ##################
function get_chrstats()
{
//=== get character name ====
	var chr_name0 = "";
	for( i = 20; i < 36; i++) if( hdata[i] > 32 ) chr_name0 += String.fromCharCode(hdata[i]);
	document.stats_sheet.chr_name.value = chr_name0;
	chr_name_chk(chr_name0);

//=== get character class ====
	document.stats_sheet.chr_class.selectedIndex = hdata[40];

//=== get character progression ====
	document.stats_sheet.chr_prog.selectedIndex = Math.floor(hdata[37] / 5);

//=== get wearing ====
	wearing0 = "";
	for(i = 136; i < 168; i++) wearing0 += hdata0[i];

//=== get mercenary information ====
	merc_ID0 = hdata0[179] + hdata0[180] + hdata0[181] + hdata0[182];

	if(parseInt(hdata0[177] + hdata0[178], 16) == 0){
		document.merc_edit.mercdie.checked = 0;
	}else{
		document.merc_edit.mercdie.checked = 1;
	}

	if(parseInt(hdata0[182] + hdata0[181] + hdata0[180] + hdata0[179], 16) == 0){
		document.merc_edit.mercon.checked = 0;
		document.merc_edit.merc_exp.value = 0;
		document.merc_edit.merc_IDd.value = "";
		document.merc_edit.merc_lvl.value = 0;
	}else{
		document.merc_edit.mercon.checked = 1;
		document.merc_edit.merc_exp.value = parseInt(hdata0[190] + hdata0[189] + hdata0[188] + hdata0[187], 16);
		document.merc_edit.merc_IDd.value = merc_ID0;

		namecd = parseInt(hdata0[184] + hdata0[183], 16);
		typecd = parseInt(hdata0[186] + hdata0[185], 16);

		if(typecd < 6){
			document.merc_edit.merc_select[0].checked = 1;
			document.merc_edit.roguename.selectedIndex = namecd;
			document.merc_edit.rogue_skill.selectedIndex = typecd % 2;
			document.merc_edit.merc_dif.selectedIndex = Math.floor(typecd / 2);
		}else if(typecd < 15){
			typecd -=6;
			document.merc_edit.merc_select[1].checked = 1;
			document.merc_edit.desertname.selectedIndex = namecd;
			document.merc_edit.desert_skill.selectedIndex = typecd % 3;
			document.merc_edit.merc_dif.selectedIndex = Math.floor(typecd / 3);
		}else if(typecd < 24){
			typecd -=15;
			document.merc_edit.merc_select[2].checked = 1;
			document.merc_edit.eastname.selectedIndex = namecd;
			document.merc_edit.east_skill.selectedIndex = typecd % 3;
			document.merc_edit.merc_dif.selectedIndex = Math.floor(typecd / 3);
		}else{
			typecd -=24;
			document.merc_edit.merc_select[3].checked = 1;
			document.merc_edit.barbname.selectedIndex = namecd;
			document.merc_edit.merc_dif.selectedIndex = Math.floor(typecd / 3);
		}

		document.merc_edit.merc_lvl.selectedIndex = get_merclvl(document.merc_edit.merc_exp.value, get_merctblno(0));

		get_mercexp();
	}

//=== get stats ====

	if(impo_mode == 0){
		document.stats_sheet.chr_str.value = 0;
		document.stats_sheet.chr_ene.value = 0;
		document.stats_sheet.chr_dex.value = 0;
		document.stats_sheet.chr_vit.value = 0;
		document.stats_sheet.chr_stat.value = 0;
		document.stats_sheet.chr_skill.value = 0;
		document.stats_sheet.chr_life0.value = 0;
		document.stats_sheet.chr_life1.value = 0;
		document.stats_sheet.chr_mana0.value = 0;
		document.stats_sheet.chr_mana1.value = 0;
		document.stats_sheet.chr_sta0.value = 0;
		document.stats_sheet.chr_sta1.value = 0;
		document.stats_sheet.chr_gold0.value = 0;
		document.stats_sheet.chr_gold1.value = 0;

		var bit_data0 = hdata[767];
		var bit_data1 = hdata[768];
		pointer = 766;
		stats_tmp = "";
		stats_code = 0;

		while((stats_code != 511) && (pointer < 840)){
			if(stats_tmp.length < 42){
				while(stats_tmp.length < 42){
					pointer++;
					dum = "00000000" + hdata[pointer].toString(2);
					stats_tmp = dum.substr(dum.length - 8, 8) + stats_tmp;
				}
			}

			stats_tmp1 = parseInt(stats_tmp,2);
			stats_code = stats_tmp1 & 511;
			stats_tmp1 = stats_tmp1 >>> 9;

			switch(stats_code){
			case 0:
				document.stats_sheet.chr_str.value = stats_tmp1 & 1023;
				break;
			case 1:
				document.stats_sheet.chr_ene.value = stats_tmp1 & 1023;
				break;
			case 2:
				document.stats_sheet.chr_dex.value = stats_tmp1 & 1023;
				break;
			case 3:
				document.stats_sheet.chr_vit.value = stats_tmp1 & 1023;
				break;
			case 4:
				document.stats_sheet.chr_stat.value = stats_tmp1 & 1023;
				break;
			case 5:
				document.stats_sheet.chr_skill.value = stats_tmp1 & 255;
				break;
			case 6:
				document.stats_sheet.chr_life0.value = (stats_tmp1 & 2097151) / 256;
				break;
			case 7:
				document.stats_sheet.chr_life1.value = (stats_tmp1 & 2097151) / 256;
				break;
			case 8:
				document.stats_sheet.chr_mana0.value = (stats_tmp1 & 2097151) / 256;
				break;
			case 9:
				document.stats_sheet.chr_mana1.value = (stats_tmp1 & 2097151) / 256;
				break;
			case 10:
				document.stats_sheet.chr_sta0.value = (stats_tmp1 & 2097151) / 256;
				break;
			case 11:
				document.stats_sheet.chr_sta1.value = (stats_tmp1 & 2097151) / 256;
				break;
			case 12:
				document.stats_sheet.chr_lvl.value = stats_tmp1 & 127;
				break;
			case 13:
				document.stats_sheet.chr_exp0.value = parseInt(stats_tmp.substr(stats_tmp.length - stats_digits[13] - 9, stats_digits[13]),2);
				break;
			case 14:
				document.stats_sheet.chr_gold0.value = stats_tmp1 & 33554431;
				break;
			case 15:
				document.stats_sheet.chr_gold1.value = stats_tmp1 & 33554431;
				break;
			}

			if(stats_code != 511){
				stats_tmp = stats_tmp.substr(0, stats_tmp.length - stats_digits[stats_code] - 9);
			}
		}

		experience();
		pointer = 780;

	}else{

		var bit_data0 = hdata[767];
		var bit_data1 = hdata[768];
		pointer = 769;

		//strength
		document.stats_sheet.chr_str.value = 0;
		if( bit_data0 & 1 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16);
			if((edit_mode == 0) && (dum > 1023)) dum = 1023;
			document.stats_sheet.chr_str.value = dum;
			pointer += 4;
		}

		//energy
		document.stats_sheet.chr_ene.value = 0;
		if( bit_data0 & 2 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16);
			if((edit_mode == 0) && (dum > 1023)) dum = 1023;
			document.stats_sheet.chr_ene.value = dum;
			pointer += 4;
		}

		//dexterity
		document.stats_sheet.chr_dex.value = 0;
		if( bit_data0 & 4 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16);
			if((edit_mode == 0) && (dum > 1023)) dum = 1023;
			document.stats_sheet.chr_dex.value = dum;
			pointer += 4;
		}

		//vitality
		document.stats_sheet.chr_vit.value = 0;
		if( bit_data0 & 8 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16);
			if((edit_mode == 0) && (dum > 1023)) dum = 1023;
			document.stats_sheet.chr_vit.value = dum;
			pointer += 4;
		}

		//stat point
		document.stats_sheet.chr_stat.value = 0;
		if( bit_data0 & 16 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer] , 16);
			if((edit_mode == 0) && (dum > 1023)) dum = 1023;
			document.stats_sheet.chr_stat.value = dum;
			pointer += 4;
		}

		//skill point
		document.stats_sheet.chr_skill.value = 0;
		if( bit_data0 & 32 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer] , 16);
			if((edit_mode == 0) && (dum > 255)) dum = 255;
			document.stats_sheet.chr_skill.value = dum;
			pointer += 4;
		}

		//current life
		if( bit_data0 & 64 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16) ;
			if((edit_mode == 0) && (dum > 2097151)) dum = 2097151;
			document.stats_sheet.chr_life0.value = dum / 256;
			pointer += 4;
		}

		//max life
		if( bit_data0 & 128 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16) ;
			if((edit_mode == 0) && (dum > 2097151)) dum = 2097151;
			document.stats_sheet.chr_life1.value = dum / 256;
			pointer += 4;
		}

		//current mana
		if( bit_data1 & 1 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16) ;
			if((edit_mode == 0) && (dum > 2097151)) dum = 2097151;
			document.stats_sheet.chr_mana0.value = dum / 256;
			pointer += 4;
		}

		//max mana
		if( bit_data1 & 2 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16) ;
			if((edit_mode == 0) && (dum > 2097151)) dum = 2097151;
			document.stats_sheet.chr_mana1.value = dum / 256;
			pointer += 4;
		}

		//current stamina
		if( bit_data1 & 4 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16) ;
			if((edit_mode == 0) && (dum > 2097151)) dum = 2097151;
			document.stats_sheet.chr_sta0.value = dum / 256;
			pointer += 4;
		}

		//max stamina
		if( bit_data1 & 8 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16) ;
			if((edit_mode == 0) && (dum > 2097151)) dum = 2097151;
			document.stats_sheet.chr_sta1.value = dum / 256;
			pointer += 4;
		}

		//level
		if( bit_data1 & 16 ){
			dum = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer], 16) ;
			if((edit_mode == 0) && (dum > 127)) dum = 127;
			document.stats_sheet.chr_lvl.value = dum;
			pointer += 4;
		}

		//exp
		experience();
		if( bit_data1 & 32 ){
			document.stats_sheet.chr_exp0.value = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer] , 16);
			pointer += 4;
		}

		//chr gold
		if( bit_data1 & 64 ){
			document.stats_sheet.chr_gold0.value = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer] , 16);
			pointer += 4;
		}

		//stash gold
		if( bit_data1 & 128 ){
			document.stats_sheet.chr_gold1.value = parseInt(hdata0[pointer + 3] + hdata0[pointer + 2] + hdata0[pointer + 1] + hdata0[pointer] , 16);
			pointer += 4;
		}
	}
}

//################## get skill data ##################
function get_skill()
{
	//find skill area
	while((hdata[pointer - 2] != 105) || (hdata[pointer - 1] != 102) && (pointer < last_point)) pointer++;

	//skill input
	skill_setting();
	for(i = 0; i < 30; i++) document.skill_sheet.skill[Math.floor(i / 10) + (i % 10) * 3].selectedIndex = hdata[pointer++];
}

//################## get item data main ##################
function get_item()
{
	//find item area
	while((hdata[pointer - 2] != 74) || (hdata[pointer - 1] != 77) && (pointer < last_point)) pointer++;
	pointer +=2;

	var item_done = 1;
	var owner_flg = 0;		// 0:Player  1:Mercenary  2:Iron Golem
	var pickedup_flg = 0;
	var pickedup_no = 0;

	//make item packages
	while(item_done){
		if(pointer != last_point){
			if((hdata[pointer] == 106) && (hdata[pointer+1] == 102)){
				if(((hdata[pointer+2] == 74) && (hdata[pointer+3] == 77)) || ((hdata[pointer+2] == 107) && (hdata[pointer+3] == 102))){
					owner_flg = 1;
					pointer +=2;
				}
			}
			if((hdata[pointer] == 107) && (hdata[pointer + 1] == 102)){
				if(((hdata[pointer+2] == 74) && (hdata[pointer+3] == 77)) || (pointer >= (last_point - 4))){
					owner_flg = 2;
					pointer +=3;
				}
			}
			if((hdata[pointer] == 74) && (hdata[pointer+1] == 77) && ((hdata[pointer+2] & 15) < 2)){
				if((item_puc.length > 100) || (item_cnt == 0)){
					if(item_cnt){
						item_puckage[item_cnt] = item_puc;
						pickedup_flg = decode_item(item_cnt);
						if(pickedup_flg){
							pickedup_no = item_cnt;
						}else if(item_deadflg[item_cnt]){
							put_item(item_cnt);
						}
					}
					item_cnt++;
				}
				item_puc = "0000000000000000";
				item_owner[item_cnt] = owner_flg;
				if((hdata[pointer + 2] == 1) && (hdata[pointer + 3] == 0) && (hdata[pointer + 4] != 74) && (hdata[pointer + 5] != 77)) pointer +=16;  //corpse character
				pointer +=2;
			}
		}
		if(pointer <= last_point){
			item_puc = item_puc + bit_conv1(hdata0[pointer].charAt(1)) + bit_conv1(hdata0[pointer].charAt(0));
			pointer++;
		}
		if(pointer > last_point){
			item_done = 0;
			if((item_puc.length < 41) && item_cnt){
				item_cnt--;
			}
			else{
				pickedup_flg = decode_item(item_cnt);
				if(pickedup_flg){
					pickedup_no = item_cnt;
				}else{
					put_item(item_cnt);
				}
				item_puckage[item_cnt] = item_puc;
			}
		}
	}

	if(pickedup_no){
		get_focus(pickedup_no);
		document.focus_sheet.item_is_picked.value = 1;
		blink_set1();
	}
}

//################## decode item data ##################
function decode_item(itemno)
{
	mopt_no[itemno] = 0;
	mopt_cd[itemno] = new Array(M_optsheet);
	mopt_value[itemno] = new Array(M_optsheet);
	item_socket[itemno] = 0;
	item_socketno1[itemno] = 0;
	item_socketno2[itemno] = 0;
	item_ethereal[itemno] = 0;
	item_location[itemno] = "";
	item_positionX[itemno] = 0;
	item_positionY[itemno] = 0;
	item_typeCD[itemno] = "";
	item_socketed[itemno] = 0;
	item_unicode[itemno] = "";
	item_quality[itemno] = 0;
	item_lvl[itemno] = 0;
	item_pictype[itemno] = 0;
	item_cspec[itemno] = "";
	item_qlvl[itemno] = 0;
	item_prefix[itemno] = 0;
	item_suffix[itemno] = 0;
	item_sizeX[itemno] = 0;
	item_sizeY[itemno] = 0;
	item_personal[itemno] = "";
	item_def[itemno] = 0;
	item_dur0[itemno] = 0;
	item_dur1[itemno] = 0;
	item_quantity[itemno] = 0;
	item_setno[itemno] = 0;
	item_color[itemno] = get_color();
	item_deadflg[itemno] = 1;
	item_glued_no[itemno] = new Array();	//glued item No.
	item_glued_cnt[itemno] = 0;
	picking_flg = 0;

//========simple area
	//there are sockets
	if(item_puc.charAt(27) == "1") item_socket[itemno] = 1;

	//ethereal
	if(item_puc.charAt(38) == "1") item_ethereal[itemno] = 1;

	//location
	dum1 = bit_picker(58, 3);
	if(dum1 == 0){
		dum2 = bit_picker(73, 3)
		if(dum2 == 1) item_location[itemno] = "Invent";
		if(dum2 == 4) item_location[itemno] = "Cube";
		if(dum2 == 5) item_location[itemno] = "Stash";
		item_positionX[itemno] = bit_picker(65, 4);
		item_positionY[itemno] = bit_picker(69, 3);
	}
	else if(dum1 == 1){
		item_location[itemno] = "Equiped";
		item_positionX[itemno] = bit_picker(61, 4);
		item_positionY[itemno] = 0;
	}
	else if(dum1 == 2){
		item_location[itemno] = "Belt";
		item_positionX[itemno] = bit_picker(65, 2);
		item_positionY[itemno] = bit_picker(67, 2);
	}
	else if(dum1 == 4){
		picking_flg = 1;
	}
	else if(dum1 == 6){
		item_location[itemno] = "Inserted";
		item_positionX[itemno] = last_glued;
		item_glued_cnt[last_glued]++;
		item_glued_no[last_glued][item_glued_cnt[last_glued]] = itemno;
	}

	//ear or not
	if((item_puc.charAt(32) == "1") && (item_puc.substring(item_puc.length - 8) == "00000000")){
		item_typeCD[itemno] = "ear";
		item_sizeX[itemno] = 1;
		item_sizeY[itemno] = 1;
		item_DBno[itemno] = get_DBno(item_typeCD[itemno]);

		bit_cnt = 86;
		dum = 99;
		while(dum){
			dum = bit_picker(bit_cnt, 7);
			if(dum) item_personal[itemno] += String.fromCharCode(dum);
			bit_cnt +=7;
		}
		dum = bit_picker(76, 3);
		switch(dum){
		case 0:
			item_personal[itemno] += "(Amazon ";
			break;
		case 1:
			item_personal[itemno] += "(Sorceress ";
			break;
		case 2:
			item_personal[itemno] += "(Necromancer ";
			break;
		case 3:
			item_personal[itemno] += "(Paladin ";
			break;
		case 4:
			item_personal[itemno] += "(Barbarian ";
			break;
		case 5:
			item_personal[itemno] += "(Druid ";
			break;
		case 6:
			item_personal[itemno] += "(Assasin ";
			break;
		}
		item_lvl[itemno] = bit_picker(79, 7);
		item_personal[itemno] = item_personal[itemno] + item_lvl[itemno] + ")";
	}
	else{
		//item type
		dum1 = bit_picker(76, 8);
		dum2 = bit_picker(84, 8);
		dum3 = bit_picker(92, 8);
		item_typeCD[itemno] = String.fromCharCode(dum1,dum2,dum3);
		item_DBno[itemno] = get_DBno(item_typeCD[itemno]);
		if(item_typeCD[itemno] == "box") item_havebox = 1;
		if(item_DBno[itemno] < 0){
			alert("******* 错误 *******\n\在 Horadric 资料中没有找到该物品\nItem No.: "+itemno+"\nLocation: "+item_location[itemno]+"("+item_positionX[itemno]+","+item_positionY[itemno]+")\nItem Code: "+item_typeCD[itemno]+"\n\n该物品已经删除(请看物品列表)。\n您无法继续编辑该人物。");
			item_deadflg[itemno] = 0;
			return 0;
		}

		//Get Item Size
		item_sizeX[itemno] = get_info(item_DBno[itemno], 1);
		item_sizeY[itemno] = get_info(item_DBno[itemno], 2);

		//Inserted Item
		if(item_socket[itemno]) item_socketed[itemno] = bit_picker(108, 3);
		if(item_socketed[itemno]) last_glued = itemno;
	}

	if((item_puc.charAt(37) == "1") || (item_typeCD[itemno] == "ear")) return picking_flg;

//========Expan area
	//Item lvl
	item_lvl[itemno] = bit_picker(143, 7);

	//Item quality
	item_quality[itemno] = bit_picker(150, 4);

	bit_cnt = 154;

	//Item picture type
	if((item_puc.charAt(bit_cnt) == "1") && ((item_typeCD[itemno] == "amu") || (item_typeCD[itemno] == "rin") || (item_typeCD[itemno] == "jew") || (item_typeCD[itemno] == "cm1") || (item_typeCD[itemno] == "cm2") || (item_typeCD[itemno] == "cm3"))){
		item_pictype[itemno] = bit_picker(bit_cnt + 1, 3);
		bit_cnt += 3;
	}
	bit_cnt++;

	//class-specific item
	if(item_puc.charAt(bit_cnt) == "1"){
		item_cspec[itemno] = bit_picker(bit_cnt + 1, 11);
		bit_cnt += 11;
	}
	bit_cnt++;

	//normal charm only
	if(((item_typeCD[itemno] == "cm1") || (item_typeCD[itemno] == "cm2") || (item_typeCD[itemno] == "cm3")) && (item_quality[itemno] == 2)) bit_cnt += 12;

	//low quality item
	if(item_quality[itemno] == 1){
		item_qlvl[itemno] = bit_picker(bit_cnt, 3);
		bit_cnt += 3;
	}
	//superior quality item
	else if(item_quality[itemno] == 3){
		item_qlvl[itemno] = bit_picker(bit_cnt, 3);
		bit_cnt += 3;
	}
	//prefix and suffix
	else if(item_quality[itemno] == 4){
		item_prefix[itemno] = bit_picker(bit_cnt, 11);
		item_suffix[itemno] = bit_picker(bit_cnt + 11, 11);
		bit_cnt += 22;
	}
	//set or unique item
	else if((item_quality[itemno] == 5) || (item_quality[itemno] == 7)){
		item_prefix[itemno] = bit_picker(bit_cnt, 12);
		bit_cnt += 12;
	}
	//rare or crafted item
	else if((item_quality[itemno] == 6) || (item_quality[itemno] == 8)){
		item_prefix[itemno] = bit_picker(bit_cnt, 8);
		item_suffix[itemno] = bit_picker(bit_cnt + 8, 8);
		bit_cnt += 16;
		for(j = 0; j < 6; j++){
			if(item_puc.charAt(bit_cnt) == "1") bit_cnt +=11;
			bit_cnt++;
		}
	}

	//rune word
	if(item_puc.charAt(42) == "1"){
		bit_cnt +=16;
		//item_DBno[itemno] = 646;
	}

	//parsonalized name
	if(item_puc.charAt(40) == "1"){
		dum1 = 999;
		while((dum1 != 0) && (bit_cnt < (item_puc.length - 7))){
			dum1 = bit_picker(bit_cnt, 7);
			if(dum1 > 31) item_personal[itemno] += String.fromCharCode(dum1);
			bit_cnt +=7
		}
	}

	if((item_puc.charAt(bit_cnt) == "1") && (item_typeCD[itemno] != "ibk")) bit_cnt +=96;

	bit_cnt++;

	//defence
	if(get_info(item_DBno[itemno], 4)){
		if(impo_mode == 0){
			item_def[itemno] = bit_picker(bit_cnt, 11) - 10;
			bit_cnt +=11;
		}else{
			item_def[itemno] = bit_picker(bit_cnt, 10) - 10;
			bit_cnt +=10;
		}
	}

	//durability
	if(get_info(item_DBno[itemno], 5)){
		item_dur1[itemno] = bit_picker(bit_cnt, 8);
		bit_cnt +=8;
		if(item_dur1[itemno] > 0){
			item_dur0[itemno] = bit_picker(bit_cnt, (edit_mode == 0 ? 9 : 8) );
			bit_cnt += (edit_mode == 0 ? 9 : 8);
		}
	}

	//sockets
	if(item_socket[itemno]){
		item_socketno1[itemno] = bit_picker(bit_cnt, 4);
		bit_cnt +=4;
	}

	//tomes
	if((item_typeCD[itemno] == "tbk") || (item_typeCD[itemno] == "ibk")) bit_cnt +=5;

	//quantity
	if(get_info(item_DBno[itemno], 6)){
		item_quantity[itemno] = bit_picker(bit_cnt, 9);
		bit_cnt +=9;
	}

	//set item options
	if(item_quality[itemno] == 5){
		item_setno[itemno] = bit_picker(bit_cnt, 5);
		bit_cnt +=5;
	}

//========magic option area
	magic_ID = 999;
	j = 0;
	last_skill1 = 0;
	last_skill2 = 0;
	last_skill3 = 0;
	last_skill4 = 0;
	last_skill5 = 0;
	last_skill6 = 0;
	last_skill7 = 0;

	while( bit_cnt < item_puc.length ){
		magic_ID = bit_picker(bit_cnt, 9);
		bit_cnt +=9;

//		if(magic_ID != 511){
			value_length = get_moptbit(magic_ID, 0, impo_mode);
			if(get_moptbit(magic_ID, 4, impo_mode) > 0) value_length += get_moptbit(magic_ID+1, 0, impo_mode)
			if(get_moptbit(magic_ID, 4, impo_mode) > 1) value_length += get_moptbit(magic_ID+2, 0, impo_mode)

			if(value_length < 0){
				alert("******* 错误 *******\n\n在修改器资料中没有找到魔法属性\nItem No.: "+itemno+"\nLocation: "+item_location[itemno]+"("+item_positionX[itemno]+","+item_positionY[itemno]+")\nItem Code: "+item_typeCD[itemno]+"\nAttribute Code: "+magic_ID+"\nAttribute Line: "+j+"\n\n该物品已经删除 (请看物品表单)\n您无法继续编辑该人物。");
				item_deadflg[itemno] = 0;
				return 0;
			}

			if((value_length >= 0) && (bit_cnt <= (item_puc.length - value_length))){
				mopt_cd[itemno][j] = magic_ID;
				mopt_value[itemno][j] = bit_picker(bit_cnt, value_length);

				if((impo_mode != edit_mode) && (magic_data0[magic_ID] != magic_data9[magic_ID])){
// Multi att conv 1.10 <> 1.09
					if(get_moptbit(magic_ID, 4, impo_mode) === 1){
						dum1 = multi_conv(magic_ID, mopt_value[itemno][j], 1);
						maxno = Math.pow(2, get_moptbit(magic_ID, 0, edit_mode)) - 1;
						if(dum1 > maxno) dum1 = maxno;

						dum2 = multi_conv(magic_ID, mopt_value[itemno][j], 2);
						maxno = Math.pow(2, get_moptbit(magic_ID+1, 0, edit_mode)) - 1;
						if(dum2 > maxno) dum2 = maxno;

						mopt_value[itemno][j] = dum1 + (dum2 << get_moptbit(magic_ID, 0, edit_mode));

					}else if(get_moptbit(magic_ID, 4, impo_mode) === 2){
						dum1 = multi_conv(magic_ID, mopt_value[itemno][j], 1);
						maxno = Math.pow(2, get_moptbit(magic_ID, 0, edit_mode)) - 1;
						if(dum1 > maxno) dum1 = maxno;

						dum2 = multi_conv(magic_ID, mopt_value[itemno][j], 2);
						maxno = Math.pow(2, get_moptbit(magic_ID+1, 0, edit_mode)) - 1;
						if(dum2 > maxno) dum2 = maxno;

						dum3 = multi_conv(magic_ID, mopt_value[itemno][j], 3);
						maxno = Math.pow(2, get_moptbit(magic_ID+2, 0, edit_mode)) - 1;
						if(dum3 > maxno) dum3 = maxno;

						mopt_value[itemno][j] = dum1 + (dum2 << get_moptbit(magic_ID, 0, mode2)) + (dum3 << (get_moptbit(magic_ID, 0, edit_mode) + get_moptbit(magic_ID+1, 0, edit_mode)));

// Class skill conv 1.10 >> 1.09
					}else if((magic_ID == 83) && (edit_mode == 9)){
						switch(mopt_value[itemno][j] & 7){
						case 0:
							mopt_cd[itemno][j] = 83;
							break;
						case 1:
							mopt_cd[itemno][j] = 86;
							break;
						case 2:
							mopt_cd[itemno][j] = 85;
							break;
						case 3:
							mopt_cd[itemno][j] = 84;
							break;
						case 4:
							mopt_cd[itemno][j] = 87;
							break;
						case 5:
							mopt_cd[itemno][j] = 179;
							break;
						case 6:
							mopt_cd[itemno][j] = 180;
							break;
						}
						mopt_value[itemno][j] = mopt_value[itemno][j] >>> 7;

// Class skill conv 1.10 << 1.09
					}else if((magic_ID == 83) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 83;
						mopt_value[itemno][j] = mopt_value[itemno][j] * 8; 
					}else if((magic_ID == 84) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 83;
						mopt_value[itemno][j] = mopt_value[itemno][j] * 8 + 3; 
					}else if((magic_ID == 85) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 83;
						mopt_value[itemno][j] = mopt_value[itemno][j] * 8 + 2; 
					}else if((magic_ID == 86) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 83;
						mopt_value[itemno][j] = mopt_value[itemno][j] * 8 + 1; 
					}else if((magic_ID == 87) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 83;
						mopt_value[itemno][j] = mopt_value[itemno][j] * 8 + 4; 
					}else if((magic_ID == 179) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 83;
						mopt_value[itemno][j] = mopt_value[itemno][j] * 8 + 5; 
					}else if((magic_ID == 180) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 83;
						mopt_value[itemno][j] = mopt_value[itemno][j] * 8 + 6; 

// Improve skill conv 1.10 >> 1.09
					}else if((magic_ID == 107) && (edit_mode == 9)){
						if(last_skill1 == 0){
							last_skill1 = 107;
						}else{
							last_skill1++;
						}
						if(last_skill1 > 187) last_skill1 = 187;
						else if(last_skill1 > 109) last_skill1 = 181;
						mopt_cd[itemno][j] = last_skill1;

// Improve skill conv 1.10 << 1.09
					}else if((magic_ID >= 107) && (magic_ID <= 109) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 107;
						mopt_value[itemno][j] = mopt_value[itemno][j] & 4095; 

// Improve Exp skill conv 1.10 << 1.09
					}else if((magic_ID >= 181) && (magic_ID <= 187) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 107;
						mopt_value[itemno][j] = mopt_value[itemno][j] & 4095; 

// Improve Pannel skill conv 1.10 >> 1.09
					}else if((magic_ID == 188) && (edit_mode == 9)){
						if(last_skill3 == 0){
							last_skill3 = 188;
						}else{
							last_skill3++;
						}
						if(last_skill3 > 193) last_skill3 = 193;
						mopt_cd[itemno][j] = last_skill3;
						dum1 = mopt_value[itemno][j];
						mopt_value[itemno][j] = (dum1 >>> 11) + (dum1 >>> 3 & 7) * 3 + (dum1 & 7);

// Improve Pannel skill conv 1.10 << 1.09
					}else if((magic_ID >= 188) && (magic_ID <= 193) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 188;
						dum1 = mopt_value[itemno][j];
						mopt_value[itemno][j] = (dum1 >>> 5 & 7) * 65536 + Math.floor((dum1 & 31) / 3) * 8 + ((dum1 & 31) % 3); 

// Chance spell Attack conv 1.10 >> 1.09
					}else if((magic_ID == 195) && (edit_mode == 9)){
						if(last_skill4 == 0){
							last_skill4 = 195;
						}else{
							last_skill4++;
						}
						if(last_skill4 > 197) last_skill4 = 197;
						mopt_cd[itemno][j] = last_skill4;
						dum1 = mopt_value[itemno][j] >>> 16;
						dum2 = mopt_value[itemno][j] >>> 6 & 1023;
						dum3 = mopt_value[itemno][j] & 63;
						if(dum3 > 31) dum3 = 31;
						mopt_value[itemno][j] = dum1 * 16384 + dum3 * 512 + dum2;

// Chance spell Attack conv 1.10 << 1.09
					}else if((magic_ID >= 195) && (magic_ID <= 197) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 195;
						dum1 = mopt_value[itemno][j] >>> 14;
						dum2 = mopt_value[itemno][j] >>> 9 & 31;
						dum3 = mopt_value[itemno][j] & 511;
						mopt_value[itemno][j] = dum1 * 65536 + dum3 * 64 + dum2;

// Chance spell Strike conv 1.10 >> 1.09
					}else if((magic_ID == 198) && (edit_mode == 9)){
						if(last_skill5 == 0){
							last_skill5 = 198;
						}else{
							last_skill5++;
						}
						if(last_skill5 > 200) last_skill5 = 200;
						mopt_cd[itemno][j] = last_skill5;
						dum1 = mopt_value[itemno][j] >>> 16;
						dum2 = mopt_value[itemno][j] >>> 6 & 1023;
						dum3 = mopt_value[itemno][j] & 63;
						if(dum3 > 31) dum3 = 31;
						mopt_value[itemno][j] = dum1 * 16384 + dum3 * 512 + dum2;

// Chance spell Strike conv 1.10 << 1.09
					}else if((magic_ID >= 198) && (magic_ID <= 200) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 198;
						dum1 = mopt_value[itemno][j] >>> 14;
						dum2 = mopt_value[itemno][j] >>> 9 & 31;
						dum3 = mopt_value[itemno][j] & 511;
						mopt_value[itemno][j] = dum1 * 65536 + dum3 * 64 + dum2;

// Chance spell Struck conv 1.10 >> 1.09
					}else if((magic_ID == 201) && (edit_mode == 9)){
						if(last_skill6 == 0){
							last_skill6 = 201;
						}else{
							last_skill6++;
						}
						if(last_skill6 > 203) last_skill6 = 203;
						mopt_cd[itemno][j] = last_skill6;
						dum1 = mopt_value[itemno][j] >>> 16;
						dum2 = mopt_value[itemno][j] >>> 6 & 1023;
						dum3 = mopt_value[itemno][j] & 63;
						if(dum3 > 31) dum3 = 31;
						mopt_value[itemno][j] = dum1 * 16384 + dum3 * 512 + dum2;

// Chance spell Struck conv 1.10 << 1.09
					}else if((magic_ID >= 201) && (magic_ID <= 203) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 201;
						dum1 = mopt_value[itemno][j] >>> 14;
						dum2 = mopt_value[itemno][j] >>> 9 & 31;
						dum3 = mopt_value[itemno][j] & 511;
						mopt_value[itemno][j] = dum1 * 65536 + dum3 * 64 + dum2;

// Charge spell conv 1.10 >> 1.09
					}else if((magic_ID == 204) && (edit_mode == 9)){
						if(last_skill7 == 0){
							last_skill7 = 204;
						}else{
							last_skill7++;
						}
						if(last_skill7 > 213) last_skill7 = 213;
						mopt_cd[itemno][j] = last_skill7;
						dum1 = mopt_value[itemno][j] >>> 24;
						dum2 = mopt_value[itemno][j] >>> 16 & 255;
						dum3 = mopt_value[itemno][j] >>> 6 & 1023;
						dum4 = mopt_value[itemno][j] & 63;
						if(dum4 > 31) dum4 = 31;
						mopt_value[itemno][j] = dum1 * 4194304 + dum2 * 16384 + dum4 * 512 + dum3;

// Charge spell conv 1.10 << 1.09
					}else if((magic_ID >= 204) && (magic_ID <= 213) && (edit_mode == 0)){
						mopt_cd[itemno][j] = 204;
						dum1 = mopt_value[itemno][j] >>> 22;
						dum2 = mopt_value[itemno][j] >>> 14 & 255;
						dum3 = mopt_value[itemno][j] >>> 9 & 31;
						dum4 = mopt_value[itemno][j] & 511;
						mopt_value[itemno][j] = dum1 * 16777216 + dum2 * 65536 + dum4 * 64 + dum3;

// Other Atts conv 1.10 <> 1.09
					}else{
						if(get_moptbit(magic_ID,3,edit_mode) == "Z"){
							j--;
						}else{
							bitno = get_moptbit(magic_ID,0,edit_mode);
							if(bitno > 0){
								maxno = Math.pow(2, bitno) - 1;
								if(mopt_value[itemno][j] > maxno) mopt_value[itemno][j] = maxno;
							}
						}
					}
				}

				bit_cnt +=value_length;
				if(magic_ID == 194){
					if(item_location[itemno] == "Inserted"){
						item_socketno2[last_glued] +=mopt_value[itemno][j];
					}
					else{
						item_socketno2[itemno] = mopt_value[itemno][j];
					}
				}
				j++;
			}
//		}
	}
	mopt_no[itemno] = j;

	while( j < M_optsheet ){
		mopt_cd[itemno][j] = "";
		mopt_value[itemno][j] = "";
		j++;
	}

	return picking_flg;
}

//################## SET SKILL NAME ##################
function skill_setting()
{
	c_class = skill_exc[document.stats_sheet.chr_class.selectedIndex];

	for(ii = 1; ii < 31; ii++) document.getElementById("skillname" + ii).innerHTML = skillname_data[skill_st[c_class] + ii - 1]
}

//################## Apply full skill ##################
function apply_fullskill()
{
	for(i = 0; i < 30; i++) document.skill_sheet.skill[i].selectedIndex = sk_max_lvl - 1;
}

//################## Get skill short cuts ##################
function get_shortcut()
{
	for(i = 0; i < 20; i++){
		dum1 = hdata[i * 4 + 56];
		dum2 = hdata[i * 4 + 57];
		dum3 = hdata[i * 4 + 58];
		dum4 = hdata[i * 4 + 59];

		if((dum3 == 0) && (dum2 != 255)){
			skey_ID[i] = dum1 + (dum2 & 1) * 256;
			skey_item[i] = 0;
			if((get_skillclass(skey_ID[i],1) == skill_exc[document.stats_sheet.chr_class.selectedIndex]) || (skey_ID[i] < 6)){
				skey_LR[i] = (dum2 < 128) ? 1 : 0;
			}else{
				skey_ID[i] = (-1);
				skey_LR[i] = 0;
			}
		}else if(dum2 != 255){
			skey_ID[i] = dum1 + (dum2 & 1) * 256;
			skey_LR[i] = (dum2 < 128) ? 1 : 0;
			skey_item[i] = dum3;
		}else{
			skey_ID[i] = (-1);
			skey_LR[i] = 0;
			skey_item[i] = 0;
		}
	}
}

//################## open short cut window ##################
function open_shortcut()
{
	get_allskill();

	for(i = 0; i < 20; i++){
		document.shortcut_sheet.skeyID[i].selectedIndex = 0;
		if(i < 16) document.shortcut_sheet.skeyLR[i].selectedIndex = skey_LR[i];
		for(j = (all_skill_max - 1); j >= 0; j--){
			document.shortcut_sheet.skeyID[i].options[j].text = all_skill_name[j];
			if(skey_ID[i] == all_skill_ID[j]) document.shortcut_sheet.skeyID[i].selectedIndex = j;
		}
	}

	document.getElementById("screen3").style.visibility = "hidden";
	f_win_man(10);
}

//################## close short cut window ##################
function close_shortcut()
{
	document.getElementById("shortcut_win").style.visibility = "hidden";
	document.getElementById("screen3").style.visibility = "visible";
}

//################## apply short cut ##################
function apply_shortcut()
{
	document.getElementById("shortcut_win").style.visibility = "hidden";
	document.getElementById("screen3").style.visibility = "visible";

	for(i = 0; i < 20; i++){
		if(i < 16) skey_LR[i] = document.shortcut_sheet.skeyLR[i].selectedIndex;
		skey_ID[i] = all_skill_ID[document.shortcut_sheet.skeyID[i].selectedIndex];
		skey_item[i] = all_skill_item[document.shortcut_sheet.skeyID[i].selectedIndex];
	}
}

//################## Get all skills ##################
function get_allskill()
{
	c_class = skill_exc[document.stats_sheet.chr_class.selectedIndex];

	all_skill_ID[1] = 0;
	all_skill_name[1] = "攻击";
	all_skill_item[1] = 0;

	all_skill_ID[2] = 2;
	all_skill_name[2] = "投掷";
	all_skill_item[2] = 0;

	all_skill_ID[3] = 3;
	all_skill_name[3] = "取消召唤";
	all_skill_item[3] = 0;

	for(i = 4; i < all_skill_max; i++){
		all_skill_ID[i] = (-1);
		all_skill_name[i] = "无";
		all_skill_item[i] = 0;
	}

	st_cnt = 3;

	for(i = 0; i < 30; i++){
		if(document.skill_sheet.skill[Math.floor(i / 10) + (i % 10) * 3].selectedIndex > 0){
			st_cnt++;
			all_skill_ID[st_cnt] = skill_st[c_class] + i;
			all_skill_name[st_cnt] = skillname_data[all_skill_ID[st_cnt]];
			all_skill_item[st_cnt] = 0;
		}
	}

	item_cnt0 = 0;

	for(i = 1; i <= item_cnt; i++){
		if((item_deadflg[i] == 1) && (item_location[i] != "Inserted")) item_cnt0++;

		if((mopt_no[i] > 0) && (item_deadflg[i] == 1)){
			for(j = 0; j < mopt_no[i]; j++){
				skill_type = skill_conv(mopt_cd[i][j], mopt_value[i][j], 1);

				if((skill_type == 1) && (sk_class == c_class)){
					skill_IDz = sk_ID;
					skill_itemz = 0;
				}else if((skill_type == 4) && (sk_chg0 > 0)){
					skill_IDz = sk_ID;
					skill_itemz = item_cnt0;
				}else if(skill_type == 7){
					skill_IDz = sk_ID;
					skill_itemz = item_cnt0;
				}else{
					skill_IDz = 0;
					skill_itemz = 0;
				}

				if(skill_IDz > 0){
					for(k = 0; k <= st_cnt; k++){
						if(skill_IDz == all_skill_ID[k]){
							skill_IDz = 0;
							break;
						}
					}
				}

				if((skill_IDz > 0) && (st_cnt < all_skill_max)){
					st_cnt++;
					all_skill_ID[st_cnt] = skill_IDz;
					all_skill_name[st_cnt] = get_skillname(skill_IDz,0);
					all_skill_item[st_cnt] = skill_itemz;
				}
			}
		}
	}
}

//################## EXPERIENCE MATCH ##################
function experience()
{
	c_lvl = document.stats_sheet.chr_lvl.value;

	if( c_lvl <= 99 ){
		document.stats_sheet.chr_exp0.value = c_exp[c_lvl - 1];
		document.getElementById("chr_exp1").innerHTML = c_exp[c_lvl];
	}
	else{
		document.stats_sheet.chr_exp0.value = 0;
		document.getElementById("chr_exp1").innerHTML = c_exp[99];
	}
}

//============================================================================= mercenary
//################## Mercenary table No/Exp get ##################
function get_merctblno(lvlflg)
{
	if(document.merc_edit.merc_select[0].checked){
		actflg = 1;
		sklflg = document.merc_edit.rogue_skill.selectedIndex;
	}else if(document.merc_edit.merc_select[1].checked){
		actflg = 2;
		sklflg = document.merc_edit.desert_skill.selectedIndex;
	}else if(document.merc_edit.merc_select[2].checked){
		actflg = 3;
		sklflg = document.merc_edit.east_skill.selectedIndex;
	}else if(document.merc_edit.merc_select[3].checked){
		actflg = 4;
		sklflg = 0;
	}

	difflg = document.merc_edit.merc_dif.selectedIndex;

	dum = "" + edit_mode + actflg + difflg + sklflg;
	ans = -1;

	for(i = 0; i < 108; i++){
		if(merc_tbl[i].substr(0,4) == dum){
			if(lvlflg == 0){
				ans = merc_tbl[i].substr(6,3) * 1;
			}else if((lvlflg < 0) && (ans < 0)){
				ans = merc_tbl[i].substr(4,2) * 1;
			}else if(lvlflg >= (merc_tbl[i].substr(4,2) * 1)){
				ans = i;
			}
		}
	}

	return ans;
}

//################## Mercenary table ##################
function get_merctbl(flg,tbl_no)
{
	return merc_tbl[tbl_no].substr(merc_order[flg], merc_order[flg+1]-merc_order[flg]) * 1;
}

//################## Mercenary exp --> lvl ##################
function get_merclvl(exp,exp_bns0)
{
	ans0 = Math.floor(exp / exp_bns0);
	ans1 = 0;
	i = 1;

	for(i = 0; i < 100; i++) if(ans0 >= (i*i*(i+1))) ans1 = i;

	return ans1;
}

//################## Mercenary exp <-- lvl ##################
function get_mercexp()
{
	lvl = document.merc_edit.merc_lvl.selectedIndex * 1;

	if(lvl < get_merctblno(-1)){
		lvl = get_merctblno(-1);
		document.merc_edit.merc_lvl.selectedIndex = lvl;
	}

	get_mercstats();

	return lvl * lvl * (lvl + 1) * get_merctblno(0);
}

//################## Mercenary stats ##################
function get_mercstats()
{
	lvl = document.merc_edit.merc_lvl.selectedIndex * 1;

	if(lvl < 4) return;

	merc_tblno = get_merctblno(lvl);
	base_lvl = get_merctbl(4,merc_tblno);
	exp_bns0 = get_merctblno(0);

	document.getElementById("merc_str").innerHTML = "";
	document.getElementById("merc_dex").innerHTML = "";
	document.getElementById("merc_life").innerHTML = "";
	document.getElementById("merc_ar").innerHTML = "";

	document.getElementById("merc_str").innerHTML = get_merctbl(10,merc_tblno) + Math.floor(get_merctbl(11,merc_tblno) * exp_bns0 * (lvl - base_lvl)/ 1000);

	document.getElementById("merc_dex").innerHTML = get_merctbl(12,merc_tblno) + Math.floor(get_merctbl(13,merc_tblno) * exp_bns0 * (lvl - base_lvl)/ 1000);

	document.getElementById("merc_life").innerHTML = get_merctbl(6,merc_tblno) + get_merctbl(7,merc_tblno) * (lvl - base_lvl);

	document.getElementById("merc_ar").innerHTML = get_merctbl(14,merc_tblno) + get_merctbl(15,merc_tblno) * (lvl - base_lvl);

	get_mercdam();

	return;
}

//################## Mercenary damage ##################
function get_mercdam()
{
	lvl = document.merc_edit.merc_lvl.selectedIndex * 1;

	if(lvl < 4) return;

	str0 = document.merc_edit.merc_str2.value * 1;
	dex0 = document.merc_edit.merc_dex2.value * 1;
	wep0 = document.merc_edit.merc_min.value * 1
	wep1 = document.merc_edit.merc_max.value * 1

	merc_tblno = get_merctblno(lvl);
	base_lvl = get_merctbl(4,merc_tblno);
	exp_bns0 = get_merctblno(0);
	base_dam0 = get_merctbl(16,merc_tblno) + Math.floor(get_merctbl(18,merc_tblno) * exp_bns0 * (lvl - base_lvl)/ 1000);
	base_dam1 = get_merctbl(17,merc_tblno) + Math.floor(get_merctbl(18,merc_tblno) * exp_bns0 * (lvl - base_lvl)/ 1000);

	document.getElementById("merc_dam").innerHTML = "";

	if(document.merc_edit.merc_select[0].checked){
		dam0 = Math.floor((dex0 + 100) * (base_dam0 + wep0) / 100);
		dam1 = Math.floor((dex0 + 100) * (base_dam1 + wep1) / 100);
		document.getElementById("merc_dam").innerHTML = dam0 + " - " + dam1;
	}else if(document.merc_edit.merc_select[1].checked){
		st_dx = Math.floor((str0 + dex0) * 75 / 100);
		dam0 = Math.floor((str0 + 100) * (base_dam0 + wep0) / 100);
		dam1 = Math.floor((str0 + 100) * (base_dam1 + wep1) / 100);
		dam2 = Math.floor((st_dx + 100) * (base_dam0 + wep0) / 100);
		dam3 = Math.floor((st_dx + 100) * (base_dam1 + wep1) / 100);
		document.getElementById("merc_dam").innerHTML = dam2+" - "+dam3+"(1H)<br>"+dam0+" - "+dam1+"(2H)";
	}else if(document.merc_edit.merc_select[2].checked){
		dam0 = Math.floor((str0 + 100) * (base_dam0 + wep0) / 100);
		dam1 = Math.floor((str0 + 100) * (base_dam1 + wep1) / 100);
		document.getElementById("merc_dam").innerHTML = dam0 + " - " + dam1;
	}else if(document.merc_edit.merc_select[3].checked){
		dam0 = Math.floor((str0 + 100) * (base_dam0 + wep0) / 100);
		dam1 = Math.floor((str0 + 100) * (base_dam1 + wep1) / 100);
		document.getElementById("merc_dam").innerHTML = dam0 + " - " + dam1;
	}
}

//============================================================================= Importing Sub
//################## HEX -> BIN (reverce) ##################
function bit_conv1(in_data)
{
	return rev_bit[hex_str.indexOf(in_data)];
}

//################## PICK UP BIT DATA ##################
function bit_picker(start_bit,bit_length)
{
	if(bit_length == 0) return 0;

	var ans = "";

	for(ii = start_bit; ii < (start_bit + bit_length); ii++) ans = item_puc.charAt(ii) + ans;

	return parseInt(ans,2);
}

//============================================================================= Item Information
//################## Get ItemDB number ##################
function get_DBno(itemtypecd)
{
	if(itemtypecd == "") return -1;

	ans = -1;
	ii = 0;

	while((ans < 0) && (ii < 647)){
		if(itemtypecd == item_DB[ii].substr(0,3)) ans = ii;
		ii++;
	}

	return ans;
}

//################## Get Item color ##################
function get_color()
{
	random_num = Math.floor(Math.random() * 127) + 127;
	ans = "#" + random_num.toString(16);

	random_num = Math.floor(Math.random() * 127) + 127;
	ans = ans + random_num.toString(16);

	random_num = Math.floor(Math.random() * 127) + 127;
	ans = ans + random_num.toString(16);

	return ans;
}

//################## Get Item format ##################
function get_info(dbno,flg)
// flg =	0	item code
//			1	sizeX
//			2	sizeY
//			3	category
//			4	defence flg
//			5	durability flg
//			6	quantity flg
//			7	socket flg
//			8	minimum damage 1 hand
//			9	maximum damage 1 hand
//			10	minimum damage 2 hand
//			11	maximum damage 2 hand
//			12	minimum damage throw
//			13	maximum damage throw
//			14	belt rows
//			15	name
//			16	picture file name
//			17	unique picture#
{
	if(isNaN(dbno)) return -1;

	switch(flg){
	case 0:
		ans = item_DB[dbno].substr(0,3);
		break;
	case 1:
		ans = item_DB[dbno].substr(3,1) * 1;
		break;
	case 2:
		ans = item_DB[dbno].substr(4,1) * 1;
		break;
	case 3:
		ans = item_DB[dbno].substr(5,1);
		break;
	case 4:
		ans = item_DB[dbno].substr(6,1) * 1;
		break;
	case 5:
		ans = item_DB[dbno].substr(7,1) * 1;
		break;
	case 6:
		ans = item_DB[dbno].substr(8,1) * 1;
		break;
	case 7:
		ans = item_DB[dbno].substr(9,1) * 1;
		break;
	case 8:
		ans = item_DB[dbno].substr(10,3) * 1;
		break;
	case 9:
		ans = item_DB[dbno].substr(13,3) * 1;
		break;
	case 10:
		ans = item_DB[dbno].substr(16,3) * 1;
		break;
	case 11:
		ans = item_DB[dbno].substr(19,3) * 1;
		break;
	case 12:
		ans = item_DB[dbno].substr(22,3) * 1;
		break;
	case 13:
		ans = item_DB[dbno].substr(25,3) * 1;
		break;
	case 14:
		ans = item_DB[dbno].substr(28,1) * 1;
		break;
	case 15:
		ans = item_DB[dbno].substring(33);
		break;
	case 16:
		ans = item_DB[dbno].substr(29,3);
		break;
	case 17:
		ans = item_DB[dbno].substr(32,1) * 1;
		break;
	}
	
	return ans;
}

//################## Get Picture file name ##################
function get_filename(itemno)
{
	filename0 = get_info(item_DBno[itemno],16);

	if(filename0.charAt(0) == "*"){
		pic_typeno = filename0.charAt(2);
		filename0 = item_typeCD[itemno];
		if(pic_typeno != "*"){
			if(item_pictype[itemno] >= (pic_typeno * 1)){
				filename0 += (pic_typeno - 1);
			}else{
				filename0 += item_pictype[itemno];
			}
		}
	}

	if(item_quality[itemno] == 7){
		unique_no = get_info(item_DBno[itemno],17);
		if(unique_no > 0) filename0 += unique_no;
	}

	return "./item_pics/" + filename0 + ".gif";
}

//============================================================================= Floating Item Window
//################## GET POINTER X-Y ##################
function handlerMM(e)
{
	pop_x = (document.all) ? document.body.scrollLeft + event.clientX : e.pageX;
	pop_y = (document.all) ? document.body.scrollTop + event.clientY : e.pageY;
	pop_flg = 1;
}

//################## Open floating ITEM WINDOW ##################
function pop(msg)
{
	if(msg == "") return;
	if(document.etc_form.f_winflg.checked == false) return;

	var br_cnt = 1;

	for(i = 0; i < (msg.length - 4); i++){
		if(msg.substr(i,4) == "<br>"){
			br_cnt++;
			i += 4;
		}
	}

	obj = document.getElementById("f_window");

	popx = pop_x + 20;
	popy = (pop_y + br_cnt * 10) > 400 ? (390 - br_cnt * 10) : pop_y - 20;

	obj.style.left = popx;
	obj.style.top = popy;
	obj.style.visibility = "visible";
	obj.innerHTML = msg;
}

//################## Close floating ITEM WINDOW ##################
function unpop()
{
	document.getElementById("f_window").style.visibility="hidden";
	document.getElementById("f_window").innerHTML = "";
}

//################## MOUSE ON ITEM ##################
function item_float(item_no0)
{
	if(document.etc_form.f_winflg.checked == false) return "";

	var ans = "";
	var socket_all = 0;
	var true_value = 0;
	
	if(item_no0 == "") return "";

	item_no1 = parseInt(item_no0, 10);
	ans  = "物品编号" + item_no1 + "<br>";

	if(item_personal[item_no0] != "") ans += item_personal[item_no0] + "'s<br>";

	ans += "<font color=" + qua_color[item_quality[item_no1]] + "><b>";

	if((item_quality[item_no1] == 4) && (item_prefix[item_no1] < 601)) ans += mpre_data[item_prefix[item_no1]];
	else if((item_quality[item_no1] == 7) && (item_prefix[item_no1] < 384)) ans += unique_data[item_prefix[item_no1]];
	else if((item_quality[item_no1] == 5) && setitem_data[item_prefix[item_no1]]) ans += setitem_data[item_prefix[item_no1]];
	else if((item_quality[item_no1] == 6) || (item_quality[item_no1] == 8)) ans += item_prefix[item_no1];

	ans += " " + get_info(item_DBno[item_no1],15) + " ";

	if((item_quality[item_no1] == 4) && (item_suffix[item_no1] < 676)) ans += "of " + msuf_data[item_suffix[item_no1]];
	else if(item_quality[item_no1] == 6) ans += item_suffix[item_no1];

	ans += "</b></font><br>";
	ans += "物品级别: " + qual_conv[item_quality[item_no1]] + "<br>";

	if(item_socket[item_no1]){
		socket_all = item_socketno1[item_no1] + item_socketno2[item_no1];
		ans += "凹槽: " + item_socketed[item_no1] + " / " + socket_all + "<br>";
	}

	if(item_dur1[item_no1] == 0){
		ans += "无法破坏<br>";
	}
	else{
		ans += "耐久性: " + item_dur0[item_no1] + " / " + item_dur1[item_no1] + "<br>";
	}

	if(item_quantity[item_no1]) ans += "数量: " + item_quantity[item_no1] + "<br>";

	if(item_ethereal[item_no1]) ans += "无形的<br>";

	if(mopt_no[item_no1]) ans += "----------------<br>";

	for(ii = 0; ii < mopt_no[item_no1]; ii++){
		true_value = mopt_value[item_no1][ii] - get_moptbit(mopt_cd[item_no1][ii], 1, edit_mode);
		if(mopt_cd[item_no1][ii] == 511){
			ans += "<span style='color:#00ff00;'>" + get_moptbit(mopt_cd[item_no1][ii], 2, edit_mode) + "</span><br>"
		}else if(get_moptbit(mopt_cd[item_no1][ii], 4, edit_mode) > 0){
			ans += multi_conv(mopt_cd[item_no1][ii], mopt_value[item_no1][ii], 0) + "<br>";
		}else if(skill_conv(mopt_cd[item_no1][ii], true_value, 0) == 0){
			ans += get_moptbit(mopt_cd[item_no1][ii], 2, edit_mode) + " : " + true_value + "<br>";
		}else{
			skill_conv(mopt_cd[item_no1][ii], true_value, 1);
			ans += get_moptbit(mopt_cd[item_no1][ii], 2, edit_mode) + sk_name + "<br>";
		}
	}

	return ans;
}

//============================================================================= Item List
//################## open item list ##################
function itemlist_open()
{
	obj = document.getElementById("itemlist_sheet");
	obj.style.left = document.body.scrollLeft + 15;
	obj.style.top = document.body.scrollTop + 85;

	item_swrite();

	f_win_man(2);
}

//################## close item list ##################
function itemlist_close()
{
	document.getElementById("itemlist_sheet").style.visibility = "hidden";
}

//################## FILLING ITEM list ##################
function item_swrite()
{
	start_cnt = document.item_sheet.item_top.value * 1;
	if(isNaN(start_cnt)) start_cnt = 0;

	for(i = 0; i < 10; i++){
		ii = start_cnt + i;
		if(ii <= item_cnt){
			document.getElementById("itemlist_stat"+(i+1)).innerHTML = (item_deadflg[ii] ? "" : "Deleted");
			document.getElementById("itemlist_name"+(i+1)).innerHTML = (item_DBno[ii] >= 0) ? get_info(item_DBno[ii],15) : ("Import Error (Type CD = " + item_typeCD[ii] + ")");
			document.getElementById("itemlist_qua"+(i+1)).innerHTML = qual_conv[item_quality[ii]];
			document.item_sheet.elements[i].style.backgroundColor = item_color[ii];
			document.item_sheet.elements[i].value = ii;

			if(item_socket[ii]){
				document.getElementById("itemlist_soc"+(i+1)).innerHTML = item_socketed[ii] + " / " + item_socketno1[ii] + " (基础) + " +  item_socketno2[ii] + " (添加)";
			}
			else{
				document.getElementById("itemlist_soc"+(i+1)).innerHTML = "None";
			}

			if(item_location[ii] == "Inserted"){
				document.getElementById("itemlist_store"+(i+1)).innerHTML = "Inserted (" + item_positionX[ii] + ")";
			}
			else{
				document.getElementById("itemlist_store"+(i+1)).innerHTML = item_location[ii] + " (" + item_positionX[ii] + " - " + item_positionY[ii] + ")";
			}
		}
		else{
			document.getElementById("itemlist_stat"+(i+1)).innerHTML = "";
			document.getElementById("itemlist_name"+(i+1)).innerHTML = "";
			document.getElementById("itemlist_qua"+(i+1)).innerHTML = "";
			document.getElementById("itemlist_soc"+(i+1)).innerHTML = "";
			document.getElementById("itemlist_store"+(i+1)).innerHTML = "";
			document.item_sheet.elements[i].style.backgroundColor = button_non;
			document.item_sheet.elements[i].value = "";
		}
	}
}

//################## ITEM list SCROLL UP ##################
function item_up()
{
	if(document.item_sheet.item_top.value > 10){
		document.item_sheet.item_top.value = document.item_sheet.item_top.value * 1 - 10;
		item_swrite();
	}
}

//################## ITEM list SCROLL DOWN ##################
function item_dn()
{
	if(document.item_sheet.item_top.value < (item_cnt - 10)){
		document.item_sheet.item_top.value = document.item_sheet.item_top.value * 1 + 10;
		item_swrite();
	}
}

//################## ITEM list is clicked ##################
function itemlist_click(itemno)
{
	if(itemno == "") return;

	if(item_deadflg[itemno]){
		get_focus(itemno);
		itemlist_close();
		return;
	}

	if(document.focus_sheet.item_is_picked.value * 1){
		alert("在恢复之前您要先放下该物品。");
		return;
	}

	if((item_location[itemno] == "Cube") && item_havebox){
		alert("您已经有赫拉迪克方块。");
		return;
	}

	alert("该物品已经恢复 :)");

	get_focus(itemno);

	item_deadflg[itemno] = 1;
	document.getElementById("item_pick").innerHTML = "";
	document.getElementById("item_pick").innerHTML = "Picking";
	document.focus_sheet.item_is_picked.value = 1;
	blink_set1();
	itemlist_close();
}

//============================================================================= Item Button Put - Click
//################## PUT ITEM ##################
function put_item(itemno)
{
	var X = item_positionX[itemno];
	var Y = item_positionY[itemno];

	if(item_location[itemno] == "Equiped"){
		IDname = "S" + (item_owner[itemno] * 1 + 4) + ((item_owner[itemno] != 2) ? (((X < 10) ? "0" : "") + X) : "00");
		document.getElementById(IDname).innerHTML = itemno;
		document.getElementById(IDname).style.backgroundImage = "url(" + get_filename(itemno) + ")";
	}
	else if(item_location[itemno] != "Inserted"){
		filename = get_filename(itemno);
		for(XX = 0; XX < item_sizeX[itemno]; XX++){
			for(YY = 0; YY < item_sizeY[itemno]; YY++){
				IDname = "S" + location_code.indexOf(item_location[itemno].charAt(0)) + (X + XX) + (Y + YY);
				document.getElementById(IDname).innerHTML = itemno;
				document.getElementById(IDname).style.backgroundImage = "url(" + filename + ")";
				document.getElementById(IDname).style.backgroundPosition = (XX * (-20)) + "px " + (YY * (-20)) + "px";
			}
		}
	}
}

//################## Matrix is CLICKED ##################
function mat_click(IDname)
{
	if((document.focus_sheet.item_is_picked.value * 1) == 0){
		get_focus(document.getElementById(IDname).innerHTML);
		return;
	}

	itemno = document.focus_sheet.pick_no.value * 1;
	sheet = IDname.substr(1,1) * 1;		// 0:Stash 1:Invent 2:Cube 3:Belt 4:Equip 5:Mercnary 6:Golem 7:socket

	if(sheet == 7){
		alert("无法操作！");
		return;
	}

	if(sheet == 2){
		if(item_havebox == 0){
			alert("您没有赫拉迪克方块。");
			return;
		}
		if(item_typeCD[itemno] == "box"){
			alert("无法操作！");
			return;
		}
	}

	var pos_x = (sheet < 4) ? (IDname.substr(2,1) * 1) : (IDname.substr(2,2) * 1);
	var pos_y = (sheet < 4) ? (IDname.substr(3,1) * 1) : 0;

	if(sheet == 3){
		if(get_info(item_DBno[itemno],3) != "h"){
			alert("该物品无法安置在腰带。");
			return;
		}
		var belt_row = 1;
		if(document.getElementById("S408").innerHTML != ""){
			belt_row = get_info(item_DBno[document.getElementById("S408").innerHTML * 1],14);
			if(belt_row == 0) belt_row = 1;
		}
		if(pos_y > (belt_row - 1)){
			alert("此腰带的最低数量为 " + belt_row + " only.");
			return;
		}
	}

	if(glueeee(document.getElementById(IDname).innerHTML)) return;

	nonitem_flg = 0;

	if(sheet < 4){
		for(XX = pos_x; XX < (pos_x + item_sizeX[itemno]); XX++){
			for(YY = pos_y; YY < (pos_y + item_sizeY[itemno]); YY++){
				if((XX > sheet_sizeX[sheet]) || (YY > sheet_sizeY[sheet]) || (document.getElementById("S" + sheet + XX + YY).innerHTML != "")) nonitem_flg = 1;
			}
		}
	}
	else{
		if(document.getElementById(IDname).innerHTML != "") nonitem_flg = 1;
	}

	if(nonitem_flg){
		alert("无法操作！");
		return;
	}

	item_location[itemno] = location_name[sheet];
	item_owner[itemno] = (sheet < 5) || (sheet == 7) ? 0 : (sheet - 4);
	item_positionX[itemno] = pos_x;
	item_positionY[itemno] = pos_y;

	put_item(itemno);
	item_pickoff();
}

//################## Matrix is W CLICKED ##################
function dbl_click(IDname)
{
	if(((document.focus_sheet.item_is_picked.value * 1) == 0) && (document.getElementById(IDname).innerHTML != "")){
		get_focus(document.getElementById(IDname).innerHTML);
		item_pickup();
	}
}
//################## GLUE Jewel, Rune and Gem ##################
function glueeee(glued_item)
{
	if(glued_item == "") return 0;

	itemno = document.focus_sheet.pick_no.value * 1;
	itemcat = get_info(item_DBno[itemno],3);
	
	if((itemcat != "z") && (itemcat != "f") && (itemcat != "g")) return 0;  //z:jewel  f:rune  g:gem

	item_no1 = parseInt(glued_item, 10);

	if(get_info(item_DBno[item_no1],7) == 0){
		alert("无法操作！该物品无凹槽。");
		return 1;
	}

	if(item_socket[item_no1] != 1){
		alert("无法操作！该物品没有任何凹槽。");
		return 1;
	}

	if(item_socketed[item_no1] >= (item_socketno1[item_no1] + item_socketno2[item_no1])){
		alert("无法操作！凹槽已满！");
		return 1;
	}

	item_socketed[item_no1]++;
	item_glued_no[item_no1][item_socketed[item_no1]] = itemno;
	item_location[itemno] = "Inserted";
	item_positionX[itemno] = item_no1;
	item_positionY[itemno] = 0;

	item_socketno2[item_no1] = get_allsocno(item_no1);
	
	item_pickoff();

	alert("取下的物品已经插入 ( " + item_socketed[item_no1] + " / " + item_socketno1[item_no1] + "+" + item_socketno2[item_no1] + " ).");

	return 1;
}

//################## Calculate item_socketno2 ##################
function get_allsocno(itemno1)
{
	ans = 0;

	for(ii = 0; ii < mopt_no[itemno1]; ii++) if(mopt_cd[itemno1][ii] == 194) ans +=mopt_value[itemno1][ii];	

	if(item_socketed[itemno1] > 0){
		for(ii = 1; ii <= item_socketed[itemno1]; ii++){
			dum1 = item_glued_no[itemno1][ii];
			for(jj = 0; jj < mopt_no[dum1]; jj++) if(mopt_cd[dum1][jj] == 194) ans +=mopt_value[dum1][jj];
		}
	}

	return ans;
}

//============================================================================= Pick up - Create - Delete
//################## Pick up Item ##################
function item_pickup()
{
	if((document.focus_sheet.item_is_picked.value * 1)) return;

	itemno = document.focus_sheet.pick_no.value * 1;

	if(isNaN(itemno)) return;
	if((itemno < 1) || (itemno > item_cnt)) return;

	var X = item_positionX[itemno];
	var Y = item_positionY[itemno];

	if(item_location[itemno] == "Inserted"){
		soc_addno = 0;
		for(ii = 0; ii < mopt_no[itemno]; ii++) if(mopt_cd[itemno][ii] == 194) soc_addno = mopt_value[itemno][ii];
		over_soc = glue_overchk(X,soc_addno,0) - 1;
		if(over_soc > 0){
			alert("Remove " + over_soc + " item" + ((over_soc > 1) ? "s" : "") + " Inserted in item#" + X + " before remove this jewel.");
			return;
		}
		for(ii = 0; ii < 6; ii++){
			document.getElementById("S70" + ii).innerHTML = "";
			document.getElementById("S70" + ii).style.backgroundImage = "";
		}
		delete_flg = 0;
		for(ii = 1; ii <= item_socketed[X]; ii++){
			if(item_glued_no[X][ii] == itemno) delete_flg = 1;
			if(delete_flg == 1){
				if(ii == item_socketed[X]){
					item_glued_no[X][ii] = 0;
				}
				else{
					item_glued_no[X][ii] = item_glued_no[X][ii + 1];
				}
			}
		}
		item_socketed[X]--;
		item_socketno2[X] -= soc_addno;
	}
	else if(item_location[itemno] == "Equiped"){
		IDname = "S" + (item_owner[itemno] * 1 + 4) + ((item_owner[itemno] != 2) ? (((X < 10) ? "0" : "") + X) : "00");
		if(item_owner[itemno] == 0){
			if(X == 8){
				nonitem_flg = 0;
				for(XX = 0; XX < 4; XX++){
					for(YY = 1; YY < 4; YY++){
						if(document.getElementById("S3" + XX + YY).innerHTML != "") nonitem_flg = 1;
					}
				}
				if(nonitem_flg == 1){
					alert("有些物品在移去之后无法安置。");
					return;
				}
			}
		}
		document.getElementById(IDname).innerHTML = "";
		document.getElementById(IDname).style.backgroundImage = "";
	}
	else if(item_location[itemno] != "Inserted"){
		for(XX = 0; XX < item_sizeX[itemno]; XX++){
			for(YY = 0; YY < item_sizeY[itemno]; YY++){
				IDname = "S" + location_code.indexOf(item_location[itemno].charAt(0)) + (X + XX) + (Y + YY);
				document.getElementById(IDname).innerHTML = "";
				document.getElementById(IDname).style.backgroundImage = "";
			}
		}
	}

	document.focus_sheet.item_is_picked.value = 1;
	blink_set1();
}

//################## Pick Up OFF ##################
function item_pickoff()
{
	clearTimeout(blink_ID1);
	blink_copy = 0;
	blink_create = 0;
	document.getElementById("item_pick").src = "./gifs/buttons5/pickup1.gif";
	document.getElementById("item_cre").src = "./gifs/buttons5/create1.gif";
	document.getElementById("item_copyy").src = "./gifs/buttons5/copy1.gif";
	document.focus_sheet.item_is_picked.value = 0;
}

//################## Create Item ##################
function item_create()
{
	if((document.focus_sheet.item_is_picked.value * 1)){
		alert("创建新物品前请先放下取下的物品。");
		return;
	}

	item_cnt++;
	document.focus_sheet.pick_no.value = item_cnt;
	mopt_no[item_cnt] = 0;
	mopt_cd[item_cnt] = new Array(M_optsheet);
	mopt_value[item_cnt] = new Array(M_optsheet);
	item_owner[item_cnt] = 0;
	item_socket[item_cnt] = 0;
	item_socketno1[item_cnt] = 0;
	item_socketno2[item_cnt] = 0;
	item_ethereal[item_cnt] = 0;
	item_location[item_cnt] = "";
	item_positionX[item_cnt] = 0;
	item_positionY[item_cnt] = 0;
	item_typeCD[item_cnt] = get_info(0,0);
	item_DBno[item_cnt] = 0;
	item_socketed[item_cnt] = 0;
	item_unicode[item_cnt] = "";
	item_quality[item_cnt] = 2;
	item_lvl[item_cnt] = 99;
	item_pictype[item_cnt] = 0;
	item_cspec[item_cnt] = "";
	item_qlvl[item_cnt] = 1;
	item_prefix[item_cnt] = 0;
	item_suffix[item_cnt] = 0;
	item_sizeX[item_cnt] = 1;
	item_sizeY[item_cnt] = 1;
	item_personal[item_cnt] = "";
	item_def[item_cnt] = 0;
	item_dur0[item_cnt] = 0;
	item_dur1[item_cnt] = 0;
	item_quantity[item_cnt] = 0;
	item_setno[item_cnt] = 0;
	item_color[item_cnt] = get_color();
	item_deadflg[item_cnt] = 1;
	item_glued_no[item_cnt] = new Array();	//glued item No.
	item_glued_cnt[item_cnt] = 0;

	for(ii = 0; ii < M_optsheet ; ii++){
		mopt_cd[item_cnt][ii] = "";
		mopt_value[item_cnt][ii] = "";
	}

	get_focus(item_cnt);

	document.focus_sheet.item_is_picked.value = 1;
	blink_create = 1;
	blink_set1();
}

//################## Copy Item ##################
function item_copy()
{
	if((document.focus_sheet.item_is_picked.value * 1)){
		alert("复制物品前请先放下取下的物品。");
		return;
	}

	itemno = document.focus_sheet.pick_no.value * 1;

	if((itemno == null) || (isNaN(itemno)) || (itemno == 0)) return;

	if(item_typeCD[itemno] == "box"){
		alert("无法复制赫拉迪克方块。");
		return;
	}

	if(item_socketed[itemno]){
		item_export(0);
		item_import_main(document.inex_sheet.inex_data.value);
		clearTimeout(blink_ID1);
		blink_copy = 0;
		blink_create = 0;
	}else{
		item_cnt++;
		document.focus_sheet.pick_no.value = item_cnt;
		mopt_no[item_cnt] = mopt_no[itemno];
		mopt_cd[item_cnt] = new Array(M_optsheet);
		mopt_value[item_cnt] = new Array(M_optsheet);
		item_owner[item_cnt] = item_owner[itemno];
		item_socket[item_cnt] = item_socket[itemno];
		item_socketno1[item_cnt] = item_socketno1[itemno];
		item_socketno2[item_cnt] = item_socketno2[itemno];
		item_ethereal[item_cnt] = item_ethereal[itemno];
		item_location[item_cnt] = "";
		item_positionX[item_cnt] = 0;
		item_positionY[item_cnt] = 0;
		item_typeCD[item_cnt] = item_typeCD[itemno];
		item_DBno[item_cnt] = item_DBno[itemno];
		item_socketed[item_cnt] = 0;
		item_unicode[item_cnt] = item_unicode[itemno];
		item_quality[item_cnt] = item_quality[itemno];
		item_lvl[item_cnt] = item_lvl[itemno];
		item_pictype[item_cnt] = item_pictype[itemno];
		item_cspec[item_cnt] = item_cspec[itemno];
		item_qlvl[item_cnt] = item_qlvl[itemno];
		item_prefix[item_cnt] = item_prefix[itemno];
		item_suffix[item_cnt] = item_suffix[itemno];
		item_sizeX[item_cnt] = item_sizeX[itemno];
		item_sizeY[item_cnt] = item_sizeY[itemno];
		item_personal[item_cnt] = item_personal[itemno];
		item_def[item_cnt] = item_def[itemno];
		item_dur0[item_cnt] = item_dur0[itemno];
		item_dur1[item_cnt] = item_dur1[itemno];
		item_quantity[item_cnt] = item_quantity[itemno];
		item_setno[item_cnt] = item_setno[itemno];
		item_color[item_cnt] = get_color();
		item_deadflg[item_cnt] = 1;
		item_glued_no[item_cnt] = new Array();	//glued item No.
		item_glued_cnt[item_cnt] = 0;
		document.getElementById("opt_page").innerHTML = "0";

		for(ii = 0; ii < M_optsheet ; ii++){
			mopt_cd[item_cnt][ii] = mopt_cd[itemno][ii];
			mopt_value[item_cnt][ii] = mopt_value[itemno][ii];
		}

		get_focus(item_cnt);
	}

	document.focus_sheet.item_is_picked.value = 1;
	blink_copy = 1;
	blink_set1();
}

//################## Delete Item ##################
function item_delete()
{
	if((document.focus_sheet.item_is_picked.value * 1) != 1){
		alert("请先取下要删除的物品。");
		return;
	}

	itemno = document.focus_sheet.pick_no.value;

	if(item_typeCD[itemno] == "box"){
		nonitem_flg = 0;
		for(XX = 0; XX < 3; XX++) for(YY = 0; YY < 4; YY++) if(document.getElementById("S2" + XX + YY).innerHTML != "") nonitem_flg = 1;
		if(nonitem_flg){
			alert("您的赫拉迪克方块内有物品。");
			return;
		}
		else item_havebox = 0;
	}

	if(document.etc_form.del_conf.checked == true){
		if(item_socketed[itemno]){
			if(confirm("您是否要删除该物品以及已镶入凹槽的物品？\n (您可以在物品表单中还原已删除的物品)") == false) return;
		}else{
			if(confirm("您是否要删除该物品？\n (您可以在物品表单中还原已删除的物品)") == false) return;
		}
	}

	if(item_socketed[itemno]){
		for(i = 1; i <= item_socketed[itemno]; i++){
			item_deadflg[item_glued_no[itemno][i]] = 0;
			obj = document.getElementById("S70" + (i*1-1));
			obj.innerHTML = "";
			obj.style.backgroundImage = "";
		}
	}

	item_deadflg[itemno] = 0;
	item_pickoff();
	f_win_man(0);
	document.focus_sheet.reset();
	reset_focus();
}

//################## Import Item Data ##################
function item_import()
{
	if((document.focus_sheet.item_is_picked.value * 1) == 1){
		alert("导入前请先放下取下的物品");
		return;
	}

	document.inex_sheet.inex_data.value = "";
	document.inex_sheet.inex_data_file.value = "";
	document.getElementById("inex_title").src = title_import.src;
	document.getElementById("inex_message").innerHTML = "";
	document.getElementById("inex_message").innerHTML = '确认物品版本<br>然后黏贴物品的Hex资料 (ex. from d2i file "4A 4D...")<br>点选关闭按钮<br>警告：导入错误的资料可能导致该人物无法使用！';

	document.inex_sheet.inex_select.style.visibility = "visible";
	document.inex_sheet.inex_data_file.style.visibility = "visible";

	f_win_man(7);
}

//################## Import Item Data main ##################
function item_import_main(import_item_data)
{
	if((document.focus_sheet.item_is_picked.value * 1) == 1){
		alert("导入前请先放下取下的物品");
		return;
	}

	if(import_item_data == "") return;

	if(import_item_data.length < 28){
		alert("这不是物品资料！");
		return;
	}

	pointer = 0;
	make_bytedata(import_item_data);

	if((hdata0[0] != "4A") || (hdata0[1] != "4D") || (pointer < 13)){
		alert("这不是物品资料！");
		return;
	}

	if(document.inex_sheet.inex_select.selectedIndex == 0) impo_mode = 0;
	else impo_mode = 9;

	item_puc = "";
	parent_item = item_cnt + 1;

	for(i = 0; i <= last_point; i++){
		if((hdata0[i] == "4A") && (hdata0[i+1] == "4D") && (i > 1) && (i < last_point)){
			item_cnt++;
			decode_item(item_cnt);
			item_puc = "";
		}
		item_puc = item_puc + bit_conv1(hdata0[i].charAt(1)) + bit_conv1(hdata0[i].charAt(0));
	}

	item_cnt++;
	decode_item(item_cnt);
	get_focus(parent_item);

	document.focus_sheet.item_is_picked.value = 1;
	blink_set1();
}

//################## Export Item Data ##################
function item_export(dum0)
{
	itemno = document.focus_sheet.pick_no.value * 1;

	if(isNaN(itemno) || (itemno == 0)) return;

	export_data0 = "4A4D" + cre_itemsub1(itemno);

	if(item_socketed[itemno]){
		for(main_j = 1; main_j <= item_socketed[itemno]; main_j++){
			export_data0 = export_data0 + "4A4D" + cre_itemsub1(item_glued_no[itemno][main_j]);
		}
	}

	export_data = "";

	for(i = 0; i < export_data0.length; i+=64) export_data += export_data0.substr(i,64) + String.fromCharCode(13);

	document.inex_sheet.inex_data.value = export_data.toUpperCase();
	document.getElementById("inex_title").src = title_export.src;
	document.getElementById("inex_message").innerHTML = "";
	document.getElementById("inex_message").innerHTML = "复制文字框内的所有Hex资料，然后黏贴到Hex编辑器中。<br>(资料版本： " + ((edit_mode == 0) ? "1.10" : "1.09") + ".)";

	document.inex_sheet.inex_select.style.visibility = "hidden";
	document.inex_sheet.inex_data_file.style.visibility = "hidden";

	if(dum0) f_win_man(7);
}

//################## close InExport window ##################
function inex_close()
{
	if(document.getElementById("inex_title").src == title_import.src) item_import_main(document.inex_sheet.inex_data.value);

	document.inex_sheet.inex_select.style.visibility = "hidden";
	document.getElementById("inexport_win").style.visibility = "hidden";
	document.inex_sheet.inex_data_file.style.visibility = "hidden";
}

//============================================================================= Focus Sheet
//################## ITEM DATA -> FOCUS SHEET ##################
function get_focus(item_no0)
{
	if(item_no0 == "") return;

	item_no1 = item_no0 * 1;

//fill basic informations
	document.focus_sheet.pick_no.value = item_no1;
	document.focus_sheet.elements[0].value = "";
	document.focus_sheet.elements[0].value = get_info(item_DBno[item_no1],15);
	document.focus_sheet.pick_pre.value = item_prefix[item_no1];
	document.focus_sheet.pick_suf.value = item_suffix[item_no1];
	document.focus_sheet.pick_qua.selectedIndex = item_quality[item_no1] - 1;
	document.focus_sheet.pick_eth.checked = item_ethereal[item_no1];
	document.focus_sheet.pick_pic.selectedIndex = item_pictype[item_no1];
	document.focus_sheet.pick_soc.checked = item_socket[item_no1];
	document.focus_sheet.pick_quan.value = item_quantity[item_no1];
	document.focus_sheet.pick_def.value = item_def[item_no1];

	display_things(item_no1);
	opt_swrite(item_no1);

//socketed
	if((item_location[item_no1] != "Inserted") && (item_socket[item_no1])){
		for(ii = 1; ii < 8; ii++){
			obj = document.getElementById("S70" + (ii*1-1));
			if(ii <= item_socketed[item_no1]){
				obj.innerHTML = "";
				obj.innerHTML = item_glued_no[item_no1][ii];
				obj.style.backgroundImage = "url(" + get_filename(item_glued_no[item_no1][ii]) + ")";
			}
			else{
				obj.innerHTML = "";
				obj.style.backgroundImage = "";
			}
		}
	}

	if(blink_line > (-1)){
		clearTimeout(blink_ID2);
		document.focus_sheet.opt_name[blink_line].style.color = "white";
		blink_line = (-1);
	}

	f_win_man(0);
}

//################## Display things ##################
function display_things(nono)
{
	document.getElementById("pick_no0").innerHTML = "";
	document.getElementById("pick_no0").innerHTML = "#" + nono + " ( 尺寸: " + item_sizeX[nono] + " x " + item_sizeY[nono] + " )";

//name
	document.focus_sheet.pick_name.style.visibility = "visible";

//personalize button
	document.focus_sheet.pick_pers.style.visibility = "visible";

//quality
	document.focus_sheet.pick_qua.style.visibility = (simple_item.indexOf(get_info(item_DBno[nono],3)) < 0) && (item_typeCD[nono] != "ear") ? "visible" : "hidden";

//ethereal
	document.getElementById("pick_eth_hid").style.visibility = "visible";

//prefix
	document.focus_sheet.pick_pre.style.visibility = (item_quality[nono] > 3) ? "visible" : "hidden";

//suffix
	document.focus_sheet.pick_suf.style.visibility = (item_quality[nono] == 4) || (item_quality[nono] == 6) ? "visible" : "hidden";

//picture
	if((item_typeCD[nono] == "rin") || (item_typeCD[nono] == "amu") || (item_typeCD[nono] == "cm1") || (item_typeCD[nono] == "cm2") || (item_typeCD[nono] == "cm3") || (item_typeCD[nono] == "jew")){
		document.focus_sheet.pick_pic.style.visibility = "visible";
	}
	else{
		document.focus_sheet.pick_pic.style.visibility = "hidden";
	}

//socket
	obj = document.getElementById("pick_soc_hid");

	if(get_info(item_DBno[nono],7)){
		document.focus_sheet.pick_soc.style.visibility = "visible";
		if(item_socket[nono]){
			document.getElementById("pick_soced").innerHTML = item_socketed[nono];
			document.getElementById("pick_socno1").innerHTML = "/" + item_socketno1[nono] + " (基础) + ";
			document.getElementById("pick_socno2").innerHTML = item_socketno2[nono] + " (添加)";
			obj.style.visibility = "visible";
		}
		else{
			obj.style.visibility = "hidden";
		}
	}
	else{
		document.focus_sheet.pick_soc.style.visibility = "hidden";
		obj.style.visibility = "hidden";
	}

//quantity
	document.focus_sheet.pick_quan.style.visibility = get_info(item_DBno[nono],6) ? "visible" : "hidden";

//defence
	document.focus_sheet.pick_def.style.visibility = get_info(item_DBno[nono],4) ? "visible" : "hidden";

//durability
	obj = document.getElementById("pick_dur_hid");
	if(get_info(item_DBno[nono],5)){
		document.getElementById("pick_dur0").innerHTML = item_dur0[nono] + " / ";
		document.getElementById("pick_dur1").innerHTML = item_dur1[nono] + "&nbsp;";
		obj.style.visibility = "visible";
		document.focus_sheet.pick_indest.style.visibility = item_dur1[nono] ? "visible" : "hidden";
	}
	else{
		obj.style.visibility = "hidden";
		document.focus_sheet.pick_indest.style.visibility = "hidden";
	}

//damage 1
	obj = document.getElementById("pick_dam1");
	if(get_info(item_DBno[nono],8)){
		document.getElementById("pick_dam1").innerHTML = get_info(item_DBno[nono],8) + " - " + get_info(item_DBno[nono],9);
		obj.style.visibility = "visible";
	}
	else{
		obj.style.visibility = "hidden";
	}

//damage 2
	obj = document.getElementById("pick_dam2");
	if(get_info(item_DBno[nono],10)){
		document.getElementById("pick_dam2").innerHTML = get_info(item_DBno[nono],10) + " - " + get_info(item_DBno[nono],11);
		obj.style.visibility = "visible";
	}
	else{
		obj.style.visibility = "hidden";
	}

//damage throw
	obj = document.getElementById("pick_damT");
	if(get_info(item_DBno[nono],12)){
		document.getElementById("pick_damT").innerHTML = get_info(item_DBno[nono],12) + " - " + get_info(item_DBno[nono],13);
		obj.style.visibility = "visible";
	}
	else{
		obj.style.visibility = "hidden";
	}
}

//################## Open Item Selecter ##################
function open_cat_win()
{
	if((document.focus_sheet.item_is_picked.value * 1) != 1){
		alert("您可以更改该物品，\n但您必须先取下该物品。");
		return;
	}

	itemno = document.focus_sheet.pick_no.value * 1;
	cat_no = cat_index.indexOf(get_info(item_DBno[itemno],3));

	document.item_sel_sheet.cat_list.selectedIndex = cat_no;
	cat_change(cat_no);

	for(i = 0; i <= cat_max[cat_no]; i++){
		document.item_sel_sheet.cat_item_sel.selectedIndex = i;
		if(cat_item[cat_no][i] == item_DBno[itemno]) break;
	}

	f_win_man(6);
}

//################## Close Item Selecter ##################
function close_cat_win()
{
	document.getElementById("item_sel_win").style.visibility = "hidden";
}

//################## Item category is changed ##################
function cat_change(cat_no)
{
	if(isNaN(cat_no)) return;

	for(i = 0; i < 45; i++){
		if(i <= cat_max[cat_no]){
			item_text = get_info(cat_item[cat_no][i],15);
			if(get_info(cat_item[cat_no][i],8)){
				item_text += "(1: " + get_info(cat_item[cat_no][i],8) + "-" + get_info(cat_item[cat_no][i],9) + ")";
			}
			if(get_info(cat_item[cat_no][i],10)){
				item_text += "(2: " + get_info(cat_item[cat_no][i],10) + "-" + get_info(cat_item[cat_no][i],11) + ")";
			}
			if(get_info(cat_item[cat_no][i],12)){
				item_text += "(T: " + get_info(cat_item[cat_no][i],12) + "-" + get_info(cat_item[cat_no][i],13) + ")";
			}
			document.item_sel_sheet.cat_item_sel.options[i].text = item_text;
			document.item_sel_sheet.cat_item_sel.options[i].value = cat_item[cat_no][i];
		}else{
			document.item_sel_sheet.cat_item_sel.options[i].text = "";
			document.item_sel_sheet.cat_item_sel.options[i].value = (-1);
		}
	}

	document.item_sel_sheet.cat_item_sel.selectedIndex = 0;
}

//################## Item name is changed ##################
function item_name_change(selected_itemDBno)
{
	if(selected_itemDBno < 0) return;

	itemno = document.focus_sheet.pick_no.value * 1;

	if((document.focus_sheet.item_is_picked.value * 1) != 1){
		alert("您可以更改该物品的名称，\n但您必须先取下该物品。");
		return;
	}

	if(item_typeCD[itemno] == "box"){
		nonitem_flg = 0;
		for(XX = 0; XX < 3; XX++) for(YY = 0; YY < 4; YY++) if(document.getElementById("S2" + XX + YY).innerHTML != "") nonitem_flg = 1;
		if(nonitem_flg == 1){
			alert("您的赫拉迪克方块内有物品");
			return;
		}
	}

	dum1 = selected_itemDBno * 1;
	dum2 = get_info(dum1,0);
	dum3 = get_info(dum1,3);

	if(item_socketed[itemno] && (get_info(dum1,7) == 0)){
		alert("您选取的物品凹槽已满。\n更改前请先移除所有物品(珠宝、符文、宝石)");
		return;
	}

	if((dum2 == "box") && item_havebox){
		alert("您已经有赫拉迪克方块");
		return;
	}

	if(dum2 == "box") item_havebox = 1;

	document.focus_sheet.elements[0].value = "";
	document.focus_sheet.elements[0].value = get_info(dum1,15);
	item_DBno[itemno] = dum1;
	item_typeCD[itemno] = dum2;

	item_sizeX[itemno] = get_info(item_DBno[itemno],1);
	item_sizeY[itemno] = get_info(item_DBno[itemno],2);

	display_things(itemno);
	close_cat_win();
}

//################## prefix is clicked ##################
function item_prefix_click()
{
	itemno = document.focus_sheet.pick_no.value * 1;

	if(item_quality[itemno] == 4) open_prefix();
	if(item_quality[itemno] == 5) open_setitem();
	if(item_quality[itemno] == 7) open_unique();
}

//################## open unique select window ##################
function open_unique()
{
	if(document.unique_sheet.unique_name.options[0].text == ""){
		for(i = 0; i < 384; i++){
			document.unique_sheet.unique_name.options[i].text = i + " : " + unique_data[i];
			document.unique_sheet.unique_name.options[i].value = i;
		}
	}

	f_win_man(3);

	item_prefix[itemno] *= 1;

	if((isNaN(item_prefix[itemno]) == false) && (item_prefix[itemno] >= 0)){
		document.unique_sheet.unique_name.selectedIndex = item_prefix[itemno];
	}
}

//################## close unique select window ##################
function close_unique()
{
	document.getElementById("unique_win").style.visibility = "hidden";
}

//################## unique name is selected ##################
function item_unique_selected()
{
	document.focus_sheet.pick_pre.value = document.unique_sheet.unique_name.selectedIndex * 1;
	item_prefix[itemno] = document.unique_sheet.unique_name.selectedIndex * 1;
	close_unique();
}

//################## open setitem select window ##################
function open_setitem()
{
	if(document.setitem_sheet.setitem_name.options[0].text == ""){
		for(i = 0; i < 129; i++){
			document.setitem_sheet.setitem_name.options[i].text = i + " : " + setitem_data[i];
			document.setitem_sheet.setitem_name.options[i].value = i;
		}
	}

	f_win_man(16);

	item_prefix[itemno] *= 1;

	if((isNaN(item_prefix[itemno]) == false) && (item_prefix[itemno] >= 0)){
		document.setitem_sheet.setitem_name.selectedIndex = item_prefix[itemno];
	}
}

//################## close setitem select window ##################
function close_setitem()
{
	document.getElementById("setitem_win").style.visibility = "hidden";
}

//################## setitem name is selected ##################
function item_setitem_selected()
{
	document.focus_sheet.pick_pre.value = document.setitem_sheet.setitem_name.selectedIndex * 1;
	item_prefix[itemno] = document.setitem_sheet.setitem_name.selectedIndex * 1;
	close_setitem();
}

//################## open prefix select window ##################
function open_prefix()
{
	if(document.prefix_sheet.prefix_name.options[0].text == ""){
		for(i = 0; i < 601; i++){
			if(mpre_data[i] != ""){
				document.prefix_sheet.prefix_name.options[i].text = i + " : " + mpre_data[i];
				document.prefix_sheet.prefix_name.options[i].value = i;
			}
		}
	}

	f_win_man(8);

	item_prefix[itemno] *= 1;

	if((isNaN(item_prefix[itemno]) == false) && (item_prefix[itemno] >= 33) && (item_prefix[itemno] <= 600)){
		document.prefix_sheet.prefix_name.selectedIndex = item_prefix[itemno] - 33;
	}
}

//################## close prefix select window ##################
function close_prefix()
{
	document.getElementById("prefix_win").style.visibility = "hidden";
}

//################## prefix name is selected ##################
function item_prefix_selected(prefix_no)
{
	prefix_no*=1;
	document.focus_sheet.pick_pre.value = prefix_no;
	item_prefix[itemno] = prefix_no;
	close_prefix();
}

//################## suffix is clicked ##################
function item_suffix_click()
{
	itemno = document.focus_sheet.pick_no.value * 1;

	if(item_quality[itemno] == 4) open_suffix();
}

//################## open suffix select window ##################
function open_suffix()
{
	if(document.suffix_sheet.suffix_name.options[0].text == ""){
		for(i = 0; i < 676; i++){
			if(msuf_data[i] != ""){
				document.suffix_sheet.suffix_name.options[i].text = i + " : " + msuf_data[i];
				document.suffix_sheet.suffix_name.options[i].value = i;
			}
		}
	}

	f_win_man(9);

	item_suffix[itemno] *= 1;

	if((isNaN(item_suffix[itemno]) == false) && (item_suffix[itemno] >= 7) && (item_suffix[itemno] <= 675)){
		document.suffix_sheet.suffix_name.selectedIndex = item_suffix[itemno] - 7;
	}
}

//################## close suffix select window ##################
function close_suffix()
{
	document.getElementById("suffix_win").style.visibility = "hidden";
}

//################## suffix name is selected ##################
function item_suffix_selected(suffix_no)
{
	suffix_no*=1;
	document.focus_sheet.pick_suf.value = suffix_no;
	item_suffix[itemno] = suffix_no;
	close_suffix();
}

//################## prefix is changed ##################
function item_prefix_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	input_val = document.focus_sheet.pick_pre.value * 1;

	if(isNaN(input_val)){
		alert("Enter number.");
		document.focus_sheet.pick_pre.select();
		document.focus_sheet.pick_pre.focus();
		return;
	}

	item_prefix[itemno] = input_val;
}

//################## suffix is changed ##################
function item_suffix_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	input_val = document.focus_sheet.pick_suf.value * 1;

	if(isNaN(input_val)){
		alert("Enter number.");
		document.focus_sheet.pick_suf.select();
		document.focus_sheet.pick_suf.focus();
		return;
	}

	item_suffix[itemno] = input_val;
}

//################## quality is changed ##################
function item_quality_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	item_quality[itemno] = document.focus_sheet.pick_qua.selectedIndex + 1;

	if(item_quality[itemno] == 5) alert("套装物品可能会导致游戏出错！\n(Horadric 修改器不支持套装物品)");

	display_things(itemno);

	if((document.focus_sheet.item_is_picked.value * 1) != 1) put_item(itemno);
}

//################## picture type is changed ##################
function item_pictype_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	item_pictype[itemno] = document.focus_sheet.pick_pic.selectedIndex;

	if((document.focus_sheet.item_is_picked.value * 1) != 1){
		if(item_location[itemno] != "Inserted"){
			put_item(itemno);
		}else{
			itemno1 = item_positionX[itemno];
			for(i = 1; i <= item_socketed[itemno1]; i++){
				if(item_glued_no[itemno1][i] == itemno) document.getElementById("S70" + (i*1-1)).style.backgroundImage = "url(" + get_filename(itemno) + ")";
			}
		}
	}
}

//################## socket is changed ##################
function item_socket_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;

	if(item_socketed[itemno]){
		document.focus_sheet.pick_soc.checked = 1;
		alert("该物品已有镶入物\n移除前请先确认");
		return;
	}

	item_socket[itemno] = document.focus_sheet.pick_soc.checked * 1;

	if(item_socket[itemno]){
		if(item_socketno1[itemno] == 0) item_socketno1[itemno] = 1;
	}
	else{
		item_socketno1[itemno] = 0;
	}

	display_things(itemno);
	document.focus_sheet.pick_soc.focus();
}

//################## durability is clicked ##################
function item_dur_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	item_dur0[itemno] = 0;
	item_dur1[itemno] = 0;

	display_things(itemno);
}

//################## quantity is changed ##################
function item_quantity_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	input_val = document.focus_sheet.pick_quan.value * 1;

	if(isNaN(input_val)){
		alert("请输入数字");
		document.focus_sheet.pick_quan.select();
		document.focus_sheet.pick_quan.focus();
		return;
	}

	if(input_val > 511) input_val = 511;
	if(input_val < 0) input_val = 0;

	item_quantity[itemno] = input_val;
	document.focus_sheet.pick_quan.value = input_val;
}

//################## defence is changed ##################
function item_defence_change()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	input_val = document.focus_sheet.pick_def.value * 1;

	if(isNaN(input_val)){
		alert("请输入数字");
		document.focus_sheet.pick_def.select();
		document.focus_sheet.pick_def.focus();
		return;
	}

	if(edit_mode == 0){
		if(input_val > 2037) input_val = 2037;
	}else{
		if(input_val > 1013) input_val = 1013;
	}

	if(input_val < (-10)) input_val = (-10);

	item_def[itemno] = input_val;
	document.focus_sheet.pick_def.value = input_val;
}

//################## Personalize ##################
function personalize()
{
	itemno = document.focus_sheet.pick_no.value * 1;

	p_name = prompt("请输入您个人化名称 ( 2-15 英文字母或空字符串) :", item_personal[itemno]);

	if(p_name == null) return;

	if((p_name != "") && ((p_name.length < 2) || (p_name.length > 15))){
		alert("只允许2-15英文字母!!");
		return;
	}

	errorchr = "";

	for(i = (p_name.length - 1); i >= 0; i--){
		strcd = p_name.charCodeAt(i);
		//if(((strcd < 65) && (strcd != 45)) || (strcd > 122) || ((strcd > 90) && (strcd < 97) && (strcd != 95))) errorchr = String.fromCharCode(strcd);
		//放宽限制，只要是能写入装备的字符都允许输入
		if (strcd < 0 || strcd > 127) errorchr = String.fromCharCode(strcd);
	}

	if(errorchr != ""){
		alert("< " + errorchr + " > 是错误的字符！");
		return;
	}

	item_personal[itemno] = p_name;
}

//################## Reset focus sheet ##################
function reset_focus()
{
	document.focus_sheet.pick_no.value = "";
	document.focus_sheet.pick_name.style.visibility = "hidden";
	document.focus_sheet.pick_pers.style.visibility = "hidden";
	document.focus_sheet.pick_qua.style.visibility = "hidden";
	document.getElementById("pick_eth_hid").style.visibility = "hidden";
	document.focus_sheet.pick_pre.style.visibility = "hidden";
	document.focus_sheet.pick_suf.style.visibility = "hidden";
	document.focus_sheet.pick_pic.style.visibility = "hidden";
	document.focus_sheet.pick_soc.style.visibility = "hidden";
	document.getElementById("pick_soc_hid").style.visibility = "hidden";
	document.focus_sheet.pick_quan.style.visibility = "hidden";
	document.focus_sheet.pick_def.style.visibility = "hidden";
	document.getElementById("pick_dur_hid").style.visibility = "hidden";
	document.focus_sheet.pick_indest.style.visibility = "hidden";
	document.getElementById("pick_dam1").style.visibility = "hidden";
	document.getElementById("pick_dam2").style.visibility = "hidden";
	document.getElementById("pick_damT").style.visibility = "hidden";

	for(i = 0; i < M_optsheet; i++){
		document.focus_sheet.opt_no[i].style.textAlign = "center";
		document.focus_sheet.opt_no[i].style.color = "white";
		document.focus_sheet.opt_no[i].value = "";
		document.focus_sheet.opt_no[i].disabled = true;
		document.focus_sheet.opt_name[i].value = "";
		document.focus_sheet.opt_name[i].disabled = true;
		document.focus_sheet.opt_val[i].style.textAlign = "center";
		document.focus_sheet.opt_val[i].value = "";
		document.focus_sheet.opt_val[i].disabled = true;
	}

	if(blink_line > (-1)){
		clearTimeout(blink_ID2);
		document.focus_sheet.opt_name[blink_line].style.color = "white";
		blink_line = (-1);
	}

	skill_setting();
}

//################## Blink item buttons ##################
function blink_set1()
{
	blink_cnt1 *=(-1);

	if(blink_cnt1 == 1){
		document.getElementById("item_pick").src = "./gifs/buttons5/pickup2.gif";
		if(blink_create) document.getElementById("item_cre").src = "./gifs/buttons5/create2.gif";
		if(blink_copy) document.getElementById("item_copyy").src = "./gifs/buttons5/copy2.gif";
	}
	else{
		document.getElementById("item_pick").src = "./gifs/buttons5/pickup1.gif";
		if(blink_create) document.getElementById("item_cre").src = "./gifs/buttons5/create1.gif";
		if(blink_copy) document.getElementById("item_copyy").src = "./gifs/buttons5/copy1.gif";
	}

	blink_ID1 = setTimeout("blink_set1()",250); 
}

//============================================================================= Magical Options Sheet
//################## FILLING OPTION SHEET ##################
function opt_swrite(itemno)
{
	document.getElementById("opt_page").innerHTML = "";
	document.getElementById("opt_page").innerHTML = mopt_no[itemno];

	itemcat = get_info(item_DBno[itemno],3);  // f:rune  g:gem
	simple_flg = (itemcat != "f") && (itemcat != "g") && (itemcat != "h") && (itemcat != "j");

	for(ii = 0; ii < M_optsheet; ii++){
		if(ii <= (mopt_no[itemno] - 1)){
			document.focus_sheet.opt_no[ii].style.color = "white";
			document.focus_sheet.opt_no[ii].value = mopt_cd[itemno][ii];
			document.focus_sheet.opt_no[ii].disabled = false;
			document.focus_sheet.opt_val[ii].value = mopt_value[itemno][ii] - get_moptbit(mopt_cd[itemno][ii], 1, edit_mode);
			document.focus_sheet.opt_val[ii].disabled = false;
			optname_write(ii, mopt_cd[itemno][ii]);
			document.focus_sheet.opt_name[ii].disabled = false;
		}else if((ii == mopt_no[itemno]) && simple_flg){
			document.focus_sheet.opt_no[ii].style.color = "red";
			document.focus_sheet.opt_no[ii].value = "添加";
			document.focus_sheet.opt_no[ii].disabled = false;
			document.focus_sheet.opt_name[ii].value = "";
			document.focus_sheet.opt_name[ii].disabled = true;
			document.focus_sheet.opt_val[ii].value = "";
			document.focus_sheet.opt_val[ii].disabled = true;
		}else{
			document.focus_sheet.opt_no[ii].value = "";
			document.focus_sheet.opt_no[ii].disabled = true;
			document.focus_sheet.opt_name[ii].value = "";
			document.focus_sheet.opt_name[ii].disabled = true;
			document.focus_sheet.opt_val[ii].value = "";
			document.focus_sheet.opt_val[ii].disabled = true;
		}
	}
}

//################## Write Magic option name ##################
function optname_write(lineno,optcd)
{
	if(lineno < 99){
		opt_value = document.focus_sheet.opt_val[lineno].value * 1;
	}else{
		opt_value = document.bat_form.bat_value.value * 1;
	}

	if(isNaN(opt_value) || (skill_conv(optcd, opt_value, 0) == 0)){
		if(get_moptbit(optcd,4, edit_mode) == 0){
			if(lineno < 99){
				document.focus_sheet.opt_name[lineno].value = get_moptbit(optcd, 2, edit_mode);
			}else{
				document.bat_form.bat_attname.value = get_moptbit(optcd, 2, edit_mode);
			}
		}else{
			if(lineno < 99){
				document.focus_sheet.opt_name[lineno].value = multi_conv(optcd,opt_value,0);
			}else{
				if(document.bat_form.bat_type.selectedIndex == 1){
					document.bat_form.bat_attname.value = get_moptbit(optcd, 2, edit_mode);
				}else{
					document.bat_form.bat_attname.value = multi_conv(optcd,opt_value,0);
				}
			}
		}
	}else{
		skill_conv(optcd, opt_value, 1);
		if(lineno < 99){
			document.focus_sheet.opt_name[lineno].value = sk_name;
		}else{
			if(document.bat_form.bat_type.selectedIndex == 1){
				document.bat_form.bat_attname.value = get_moptbit(optcd, 2, edit_mode);
			}else{
				document.bat_form.bat_attname.value = sk_name;
			}
		}
	}

	return;
}

//============================================================================= Magical Options Sheet Sub
//################## Display Magic Select Box ##################
function magic_select_on(focused)
{
	if(focused < 99){
		if(document.focus_sheet.opt_no[focused].disabled) return;

		var attrdum = document.focus_sheet.opt_no[focused].value;

		if((document.sel_opt.opt_select.options[0].text == "") && (attrdum == "Add")){
			document.sel_opt.mcat_list.selectedIndex = 0;
			mcat_change(0);
		}else if((isNaN(attrdum) == false) && (attrdum != "Add")){
			var attrno = attrdum * 1;
			mcat_no = mcat_index.indexOf(get_moptbit(attrno,3, edit_mode));
			if((mcat_no < 0) || (mcat_no > 18)) mcat_no = 0;
			document.sel_opt.mcat_list.selectedIndex = mcat_no;
			mcat_change(mcat_no);
			document.sel_opt.opt_select.selectedIndex = 0;
			for(i = 0; i <= mcat_max[mcat_no]; i++){
				if(mcat_attr[mcat_no][i] == attrno){
					document.sel_opt.opt_select.selectedIndex = i;
					break;
				}
			}
		}
		f_win_man(4);
	}else{
		var attrdum = document.bat_form.bat_att.value * 1;

		if(isNaN(attrdum) == false){
			var attrno = attrdum * 1;
			mcat_no = mcat_index.indexOf(get_moptbit(attrno,3, edit_mode));
			if((mcat_no < 0) || (mcat_no > 18)) mcat_no = 0;
			document.sel_opt.mcat_list.selectedIndex = mcat_no;
			mcat_change(mcat_no);
			document.sel_opt.opt_select.selectedIndex = 0;
			for(i = 0; i <= mcat_max[mcat_no]; i++){
				if(mcat_attr[mcat_no][i] == attrno){
					document.sel_opt.opt_select.selectedIndex = i;
					break;
				}
			}
		}
		f_win_man(13);
	}

	document.focus_sheet.opt_focus.value = focused;
	document.sel_opt.opt_select.focus();
}

//################## close Magic Select Box ##################
function magic_select_off()
{
	document.getElementById("f_window2").style.visibility = "hidden";
}

//################## Magic category is changed ##################
function mcat_change(mcat_no)
{
	if(isNaN(mcat_no)) return;

	for(i = 0; i < 31 ; i++){
		if(i <= mcat_max[mcat_no]){
			document.sel_opt.opt_select.options[i].text = mcat_attr[mcat_no][i] + ": " + get_moptbit(mcat_attr[mcat_no][i],2, edit_mode);
			document.sel_opt.opt_select.options[i].value = mcat_attr[mcat_no][i];
		}else{
			document.sel_opt.opt_select.options[i].text = "";
			document.sel_opt.opt_select.options[i].value = (-1);
		}
	}

	document.sel_opt.opt_select.selectedIndex = 0;
}

//################## Magic option is selected ##################
function select_option(selected_option)
{
	selected_option *=1;

	if(selected_option < 0) return;

	var set_line = document.focus_sheet.opt_focus.value * 1;

	if(set_line < 99){
		var itemno = document.focus_sheet.pick_no.value * 1;
		var old_moptcd = mopt_cd[itemno][set_line];
		var add_flg = 0;

		if((isNaN(old_moptcd) || (old_moptcd == "")) && (mopt_no[itemno] <= M_optsheet)){
			add_flg = 1;
		}
		else if((old_moptcd == 194) && (selected_option != 194)){
			if(item_location[itemno] == "Inserted"){
				itemno1 = item_positionX[itemno];
				over_soc = glue_overchk(itemno1,mopt_value[itemno][set_line],0);
				if(over_soc > 0){
					alert("Remove " + over_soc + " item" + ((over_soc > 1) ? "s" : "") + " Inserted in item#" + itemno1 + " before change.");
					magic_select_off();
					return;
				}
			}
			else{
				over_soc = glue_overchk(itemno,mopt_value[itemno][set_line],0);
				if(over_soc > 0){
					alert("Remove " + over_soc + " item" + ((over_soc > 1) ? "s" : "") + " Inserted in this item before change.");
					magic_select_off();
					return;
				}
			}
		}

		/*if(edit_mode == 0){
			jj = 0;
			for(ii = 0; ii < mopt_no[itemno]; ii++) if((selected_option == mopt_cd[itemno][ii]) && (ii != set_line)) jj++;
			if(jj > 0){
				if(selected_option == 83) jj = jj;
				else if(selected_option ==  97) jj = jj;
				else if(selected_option ==  98) jj = jj;
				else if(selected_option == 107) jj = jj;
				else if(selected_option == 126) jj = jj;
				else if(selected_option == 151) jj = jj;
				else if(selected_option == 188) jj = jj;
				else if((selected_option >= 195) && (selected_option <= 213)) jj = jj;
				else if(selected_option == 511) jj = jj;
				else{
					alert("该物品中已有此项属性。");
					return;
				}
			}
		}else if(selected_option != 511){
			for(ii = 0; ii < mopt_no[itemno]; ii++){
				if((selected_option == mopt_cd[itemno][ii]) && (ii != set_line)){
					alert("该物品中已有此项属性。");
					return;
				}
			}
		}// 屏蔽这段防重复代码 */

		document.focus_sheet.opt_no[set_line].value = selected_option;
		mopt_cd[itemno][set_line] = selected_option;

		if(add_flg){
			mopt_no[itemno]++;
			mopt_value[itemno][set_line] = 0;
			opt_swrite(itemno);
		}else{
			document.focus_sheet.opt_val[set_line].value = value_chk(selected_option, document.focus_sheet.opt_val[set_line].value);
			mopt_value[itemno][set_line] = document.focus_sheet.opt_val[set_line].value * 1 + get_moptbit(mopt_cd[itemno][set_line],1, edit_mode);

			if((old_moptcd == 194) || (selected_option == 194)){
				if(item_location[itemno] == "Inserted"){
					item_socketno2[itemno1] = get_allsocno(itemno1);
				}else{
					item_socketno2[itemno] = get_allsocno(itemno);
					display_things(itemno);
				}
			}
		}

	}else{
		if(selected_option == 194){
			alert("无法批量设置凹槽。");
			return;
		}else{
			document.bat_form.bat_att.value = selected_option;
		}
	}

	optname_write(set_line, selected_option);

	magic_select_off();

	if(skill_conv(selected_option, 0, 0) > 0){
		skill_open(set_line);
	}else if(get_moptbit(selected_option,4, edit_mode) > 0){
		multi_open(set_line);
	}else{
		if(set_line < 99){
			document.focus_sheet.opt_val[set_line].focus();
			document.focus_sheet.opt_val[set_line].select();
		}else if(document.bat_form.bat_type.selectedIndex == 0){
			change_bat_att(selected_option);
			document.bat_form.bat_value.focus();
			document.bat_form.bat_value.select();
		}
	}
}

//################## Magic option value is clicked ##################
function opt_val_clk(opt_line)
{
	opt_line *= 1;
	optcd = document.focus_sheet.opt_no[opt_line].value * 1;

	if(isNaN(optcd)) return;

	if(skill_conv(optcd, 0, 0)) skill_open(opt_line);
	else if(get_moptbit(optcd,4, edit_mode) > 0) multi_open(opt_line);
}

//################## Magic option value is inputed ##################
function opt_valuein(set_line)
{
	var itemno = document.focus_sheet.pick_no.value * 1;
	set_line *= 1;
	var input_val = document.focus_sheet.opt_val[set_line].value * 1;

	if(isNaN(input_val)){
		alert("请输入数字");
		document.focus_sheet.opt_val[set_line].select();
		document.focus_sheet.opt_val[set_line].focus();
		return;
	}

	input_val = value_chk(mopt_cd[itemno][set_line],input_val);
	document.focus_sheet.opt_val[set_line].value = input_val * 1;

	if(mopt_cd[itemno][set_line] == 194){
		if(item_location[itemno] == "Inserted"){
			itemno1 = item_positionX[itemno];
			over_soc = glue_overchk(itemno1,mopt_value[itemno][set_line],input_val);
			if(over_soc > 0){
				document.focus_sheet.opt_val[set_line].value = mopt_value[itemno][set_line];
				alert("Remove " + over_soc + " item" + ((over_soc > 1) ? "s" : "") + " Inserted in item#" + itemno1 + " before change.");
				document.focus_sheet.opt_val[set_line].select();
				document.focus_sheet.opt_val[set_line].focus();
				return;
			}
		}
		else{
			over_soc = glue_overchk(itemno,mopt_value[itemno][set_line],input_val);
			if(over_soc > 0){
				document.focus_sheet.opt_val[set_line].value = mopt_value[itemno][set_line];
				alert("Remove " + over_soc + " item" + ((over_soc > 1) ? "s" : "") + " Inserted in this item before change.");
				document.focus_sheet.opt_val[set_line].select();
				document.focus_sheet.opt_val[set_line].focus();
				return;
			}
		}
	}

	mopt_value[itemno][set_line] = input_val + get_moptbit(mopt_cd[itemno][set_line], 1, edit_mode);
	optname_write(set_line, mopt_cd[itemno][set_line]);

	if(mopt_cd[itemno][set_line] == 194){
		if(item_location[itemno] == "Inserted"){
			item_socketno2[itemno1] = get_allsocno(itemno1);
		}
		else{
			item_socketno2[itemno] = get_allsocno(itemno);
			display_things(itemno);
		}
	}
}

//################## Inputed value check ##################
function value_chk(moptcd,value0)
{
	bitno = get_moptbit(moptcd,0, edit_mode);
	bias = get_moptbit(moptcd,1, edit_mode);

	if(get_moptbit(moptcd,4, edit_mode) > 0) bitno += get_moptbit(moptcd+1,0, edit_mode);
	if(get_moptbit(moptcd,4, edit_mode) > 1) bitno += get_moptbit(moptcd+2,0, edit_mode);

	minno = 0 - bias;
	ans = value0;

	if(bitno == 0) return 0;
	
	maxno = Math.pow(2, bitno) - 1 - bias;

	if(value0 > maxno) ans = maxno;
	if(value0 < minno) ans = minno;

	return ans;
}

//################## Glue over check ##################
function glue_overchk(itemno1,before,after)
{
	ans = item_socketed[itemno1] - (item_socketno1[itemno1] + item_socketno2[itemno1] - before + after);

	return ans;
}

//################## Magic option name is clicked ##################
function opt_name_sel(sel_line)
{
	document.focus_sheet.opt_val[sel_line].focus();
	document.focus_sheet.opt_val[sel_line].blur();
	optcd = document.focus_sheet.opt_no[sel_line].value;

	if(isNaN(optcd) || (optcd == "")) return;
	optcd*=1;

	if(blink_line > (-1)){
		clearTimeout(blink_ID2);
		document.focus_sheet.opt_name[blink_line].style.color = "white";
	}

	if(blink_line == sel_line){
		blink_line = (-1);
		return;
	}

	blink_line = sel_line;
	blink_ID2 = blink_set2();
}

//################## Magic option UP ##################
function option_up()
{
	if(blink_line < 1) return;

	var itemno = document.focus_sheet.pick_no.value * 1;

	mopt_cdbk = mopt_cd[itemno][blink_line];
	mopt_valuebk = mopt_value[itemno][blink_line];
	opt_nobk = document.focus_sheet.opt_no[blink_line].value;
	opt_valbk = document.focus_sheet.opt_val[blink_line].value;
	opt_namebk = document.focus_sheet.opt_name[blink_line].value;

	mopt_cd[itemno][blink_line] = mopt_cd[itemno][blink_line - 1];
	mopt_value[itemno][blink_line] = mopt_value[itemno][blink_line - 1];
	document.focus_sheet.opt_no[blink_line].value = document.focus_sheet.opt_no[blink_line - 1].value;
	document.focus_sheet.opt_val[blink_line].value = document.focus_sheet.opt_val[blink_line - 1].value;
	document.focus_sheet.opt_name[blink_line].value = document.focus_sheet.opt_name[blink_line - 1].value;

	mopt_cd[itemno][blink_line - 1] = mopt_cdbk;
	mopt_value[itemno][blink_line - 1] = mopt_valuebk;
	document.focus_sheet.opt_no[blink_line - 1].value = opt_nobk;
	document.focus_sheet.opt_val[blink_line - 1].value = opt_valbk;
	document.focus_sheet.opt_name[blink_line - 1].value = opt_namebk;

	document.focus_sheet.opt_name[blink_line].style.color = "white";
	blink_line--;

	f_win_man(0);
}

//################## Magic option Down ##################
function option_down()
{
	var itemno = document.focus_sheet.pick_no.value * 1;

	if((blink_line < 0) || (blink_line == (mopt_no[itemno] - 1))) return;

	mopt_cdbk = mopt_cd[itemno][blink_line];
	mopt_valuebk = mopt_value[itemno][blink_line];
	opt_nobk = document.focus_sheet.opt_no[blink_line].value;
	opt_valbk = document.focus_sheet.opt_val[blink_line].value;
	opt_namebk = document.focus_sheet.opt_name[blink_line].value;

	mopt_cd[itemno][blink_line] = mopt_cd[itemno][blink_line + 1];
	mopt_value[itemno][blink_line] = mopt_value[itemno][blink_line + 1];
	document.focus_sheet.opt_no[blink_line].value = document.focus_sheet.opt_no[blink_line + 1].value;
	document.focus_sheet.opt_val[blink_line].value = document.focus_sheet.opt_val[blink_line + 1].value;
	document.focus_sheet.opt_name[blink_line].value = document.focus_sheet.opt_name[blink_line + 1].value;

	mopt_cd[itemno][blink_line + 1] = mopt_cdbk;
	mopt_value[itemno][blink_line + 1] = mopt_valuebk;
	document.focus_sheet.opt_no[blink_line + 1].value = opt_nobk;
	document.focus_sheet.opt_val[blink_line + 1].value = opt_valbk;
	document.focus_sheet.opt_name[blink_line + 1].value = opt_namebk;

	document.focus_sheet.opt_name[blink_line].style.color = "white";
	blink_line++;

	f_win_man(0);
}

//################## Delete Magic option ##################
function option_delete()
{
	if(blink_line < 0) return;

	var itemno = document.focus_sheet.pick_no.value * 1;
	var old_moptcd = mopt_cd[itemno][blink_line];

	if(old_moptcd == 194){
		if(item_location[itemno] == "Inserted"){
			itemno1 = item_positionX[itemno];
			over_soc = glue_overchk(itemno1,mopt_value[itemno][blink_line],0);
			if(over_soc > 0){
				alert("Remove " + over_soc + " item" + ((over_soc > 1) ? "s" : "") + " Inserted in item#" + itemno1 + " before delete.");
				return;
			}
		}
		else{
			over_soc = glue_overchk(itemno,mopt_value[itemno][blink_line],0);
			if(over_soc > 0){
				alert("Remove " + over_soc + " item" + ((over_soc > 1) ? "s" : "") + " Inserted in this item before change.");
				return;
			}
		}
	}

	if(document.etc_form.del_conf.checked == true){
		if(confirm("您是否要删除此项属性？") == false) return;
	}

	clearTimeout(blink_ID2);
	document.focus_sheet.opt_name[blink_line].style.color = "white";

	for(ii = blink_line; ii < 30; ii++){
		mopt_cd[itemno][ii] = mopt_cd[itemno][ii + 1];
		mopt_value[itemno][ii] = mopt_value[itemno][ii + 1];
	}

	mopt_cd[itemno][30] = "";
	mopt_value[itemno][30] = "";
	mopt_no[itemno]--;

	opt_swrite(itemno);
	f_win_man(0);

	blink_line = (-1);

	if(old_moptcd == 194){
		if(item_location[itemno] == "Inserted"){
			item_socketno2[itemno1] = get_allsocno(itemno1);
		}
		else{
			item_socketno2[itemno] = get_allsocno(itemno);
			display_things(itemno);
		}
	}
}

//################## Blink option name ##################
function blink_set2()
{
	blink_cnt2 *= (-1);

	document.focus_sheet.opt_name[blink_line].style.color = (blink_cnt2 == 1) ? "red" : "white";

	blink_ID2 = setTimeout("blink_set2()",250); 
}

//################## MAGICAL OPTION VALUE BIT ##################
function get_moptbit(optcd,flg,verflg)
{
	optcd *= 1

	var ans1 = (flg == 2) ? "" : (-1);

	if(isNaN(optcd)) return ans1;
	if(optcd > 511) return ans1;

	if(verflg == 0){
		if(flg == 0){
			ans1 = parseInt(magic_data0[optcd].charAt(0) + magic_data0[optcd].charAt(1), 10);
			//if(ans1 == 0) ans1 = (-1);
		}else if(flg == 1){
			ans1 = parseInt(magic_data0[optcd].charAt(3) + magic_data0[optcd].charAt(4) + magic_data0[optcd].charAt(5), 10);
		}else if(flg == 2){
			ans1 = (magic_data0[optcd].charAt(6) != "Z") ? magic_data0[optcd].substring(7) : "** 无意义！请删除！ **";
		}else if(flg == 3){
			ans1 = magic_data0[optcd].charAt(6);
		}else if(flg == 4){
			ans1 = parseInt(magic_data0[optcd].charAt(2), 10);
		}
	}else{
		if(flg == 0){
			ans1 = parseInt(magic_data9[optcd].charAt(0) + magic_data9[optcd].charAt(1), 10);
			//if(ans1 == 0) ans1 = (-1);
		}else if(flg == 1){
			ans1 = parseInt(magic_data9[optcd].charAt(3) + magic_data9[optcd].charAt(4) + magic_data9[optcd].charAt(5), 10);
		}else if(flg == 2){
			ans1 = (magic_data9[optcd].charAt(6) != "Z") ? magic_data9[optcd].substring(7) : "** 无意义！请删除！ **";
		}else if(flg == 3){
			ans1 = magic_data9[optcd].charAt(6);
		}else if(flg == 4){
			ans1 = parseInt(magic_data9[optcd].charAt(2), 10);
		}
	}

	return ans1;
}

//################## Multi attribute converter ##################
function multi_conv(optcd,opt_value,flg)
{
	var m_name = get_moptbit(optcd,2, edit_mode);
	var m_min = 0;
	var m_max = 0;
	var m_dur = 0;

	if(get_moptbit(optcd,4, edit_mode) == 1){
		value_length1 = get_moptbit(optcd,0, edit_mode);
		m_max = opt_value >> value_length1;
		m_min = opt_value - (m_max << value_length1);
		m_name = m_name + "(" + m_min + "-" + m_max + ")";
	}else{
		value_length1 = get_moptbit(optcd,0, edit_mode);
		value_length2 = get_moptbit(optcd+1,0, edit_mode);
		m_dur = opt_value >> (value_length1 + value_length2);
		m_max = (opt_value >> value_length1) - (m_dur << value_length2);
		m_min = opt_value - (m_dur << (value_length1 + value_length2)) - (m_max << value_length1);
		m_name = m_name + "(" + m_min + "-" + m_max + "/" + m_dur + ")";
	}

	if(flg == 0) return m_name;
	else if(flg == 1) return m_min;
	else if(flg == 2) return m_max;
	else return m_dur;
}

//################## open Multi attribute input window ##################
function multi_open(set_line)
{
	set_line *=1;

	if(set_line < 99){
		optcd = document.focus_sheet.opt_no[set_line].value * 1;
		optval = document.focus_sheet.opt_val[set_line].value * 1;
	}else{
		optcd = document.bat_form.bat_att.value * 1;
		optval = document.bat_form.bat_value.value * 1;
	}

	document.multi_sheet.multi_line.value = set_line;
	document.multi_sheet.multi_optcd.value = optcd;

	document.getElementById("multi1").innerHTML = get_moptbit(optcd,2, edit_mode) + "(Min)";
	document.getElementById("multi2").innerHTML = get_moptbit(optcd+1,2, edit_mode);

	document.multi_sheet.multi_1.value = multi_conv(optcd,optval,1);
	document.multi_sheet.multi_2.value = multi_conv(optcd,optval,2);

	if(get_moptbit(optcd,4, edit_mode) == 2){
		document.getElementById("multi3").innerHTML = get_moptbit(optcd+2,2, edit_mode);
		document.multi_sheet.multi_3.style.visibility = "visible";
		document.multi_sheet.multi_3.value = multi_conv(optcd,optval,3);
	}else{
		document.getElementById("multi3").innerHTML = "";
		document.multi_sheet.multi_3.style.visibility = "hidden";
	}

	if(set_line < 99) f_win_man(11);
	else f_win_man(15);
}

//################## close Multi attribute input window ##################
function multi_close()
{
	document.getElementById("multi_win").style.visibility = "hidden";
	document.multi_sheet.multi_3.style.visibility = "hidden";
}

//################## Multi1 is changed ##################
function multi1_change(input_val)
{
	input_val *= 1;

	if(isNaN(input_val)){
		alert("请输入数字");
		document.multi_sheet.multi_1.select();
		document.multi_sheet.multi_1.focus();
		return;
	}

	opt_cd = document.multi_sheet.multi_optcd.value * 1;
	maxno = Math.pow(2, get_moptbit(optcd,0, edit_mode)) - 1;

	if(input_val < 0) document.multi_sheet.multi_1.value = 0;
	if(input_val > maxno) document.multi_sheet.multi_1.value = maxno;
}

//################## Multi2 is changed ##################
function multi2_change(input_val)
{
	input_val *= 1;

	if(isNaN(input_val)){
		alert("请输入数字");
		document.multi_sheet.multi_2.select();
		document.multi_sheet.multi_2.focus();
		return;
	}

	opt_cd = document.multi_sheet.multi_optcd.value * 1;
	maxno = Math.pow(2, get_moptbit(optcd+1,0, edit_mode)) - 1;

	if(input_val < 0) document.multi_sheet.multi_2.value = 0;
	if(input_val > maxno) document.multi_sheet.multi_2.value = maxno;
}

//################## Multi3 is changed ##################
function multi3_change(input_val)
{
	input_val *= 1;

	if(isNaN(input_val)){
		alert("请输入数字");
		document.multi_sheet.multi_3.select();
		document.multi_sheet.multi_3.focus();
		return;
	}

	opt_cd = document.multi_sheet.multi_optcd.value * 1;
	maxno = Math.pow(2, get_moptbit(optcd+2,0, edit_mode)) - 1;

	if(input_val < 0) document.multi_sheet.multi_3.value = 0;
	if(input_val > maxno) document.multi_sheet.multi_3.value = maxno;
}

//################## Multi att calc ##################
function multi_cal()
{
	itemno = document.focus_sheet.pick_no.value * 1;
	set_line = document.multi_sheet.multi_line.value * 1;
	opt_cd = document.multi_sheet.multi_optcd.value * 1;
	multi1_val = document.multi_sheet.multi_1.value * 1;
	multi2_val = document.multi_sheet.multi_2.value * 1;
	multi3_val = document.multi_sheet.multi_3.value * 1;

	ans = multi1_val + (multi2_val << get_moptbit(optcd,0, edit_mode));

	if(get_moptbit(optcd,4, edit_mode) == 2){
		ans = ans + (multi3_val << (get_moptbit(optcd,0, edit_mode) + get_moptbit(optcd+1,0, edit_mode)));
	}

	if(set_line < 99){
		document.focus_sheet.opt_val[set_line].value = ans;
		mopt_value[itemno][set_line] = ans;
	}else{
		document.bat_form.bat_value.value = ans;
	}

	optname_write(set_line, opt_cd);

	multi_close();
}

//============================================================================= Skill Select Window
//################## skill window open ##################
function skill_open(set_line)
{
	set_line *=1;
	document.skill_win.skill_line0.value = set_line;

	if(set_line < 99){
		document.skill_win.skill_item.value = document.focus_sheet.pick_no.value;
		document.skill_win.skill_mcd.value = document.focus_sheet.opt_no[set_line].value;
		skill_type = skill_conv(document.focus_sheet.opt_no[set_line].value * 1, document.focus_sheet.opt_val[set_line].value * 1, 1);

		if((document.focus_sheet.opt_val[set_line].value * 1) == 0){
			zero_datta = 1;
		}else{
			zero_datta = 0;
			document.skill_win.skill_cls.selectedIndex = sk_class;
			document.skill_win.skill_lvl.selectedIndex = sk_lvl;
		}
	}else{
		document.skill_win.skill_item.value = 0;
		document.skill_win.skill_mcd.value = document.bat_form.bat_att.value;
		skill_type = skill_conv(document.bat_form.bat_att.value * 1, document.bat_form.bat_value.value * 1, 1);

		if((document.bat_form.bat_value.value * 1) == 0){
			zero_datta = 1;
		}else{
			zero_datta = 0;
			document.skill_win.skill_cls.selectedIndex = sk_class;
			document.skill_win.skill_lvl.selectedIndex = sk_lvl;
		}
	}
	if(skill_type == 3){
		if(zero_datta == 0) document.skill_win.skill_chc.value = sk_chc;
		document.skill_win.skill_chc.style.visibility = "visible";
	}else{
		document.skill_win.skill_chc.style.visibility = "hidden";
	}

	if(skill_type == 4){
		if(zero_datta == 0){
			if(sk_chg0 == 0) document.skill_win.skill_chg0.selectedIndex = 2;
			else if(sk_chg0 == 1) document.skill_win.skill_chg0.selectedIndex = 1;
			else if(sk_chg0 == 255) document.skill_win.skill_chg0.selectedIndex = 0;
			else document.skill_win.skill_chg0.selectedIndex = 0;

			if(sk_chg1 == 0) document.skill_win.skill_chg1.selectedIndex = 2;
			else if(sk_chg1 == 1) document.skill_win.skill_chg1.selectedIndex = 1;
			else if(sk_chg1 == 255) document.skill_win.skill_chg1.selectedIndex = 0;
			else document.skill_win.skill_chg1.selectedIndex = 0;
		}
		document.skill_win.skill_chg0.style.visibility = "visible";
		document.skill_win.skill_chg1.style.visibility = "visible";
	}
	else{
		document.skill_win.skill_chg0.style.visibility = "hidden";
		document.skill_win.skill_chg1.style.visibility = "hidden";
	}

	skill_class();

	if((skill_type == 2) && (sk_ID > 20)) sk_ID = 0;
	else if((skill_type != 2) && (sk_ID > 356)) sk_ID = skill_st[sk_class];

	if(zero_datta == 0){
		if(skill_type == 2){
			document.skill_win.skill_skl.selectedIndex = sk_ID % 3;
		}else if(skill_type == 5){
			document.skill_win.skill_skl.selectedIndex = 0;
		}else{
			document.skill_win.skill_skl.selectedIndex = sk_ID - skill_st[sk_class];
			skill_selected(sk_ID - skill_st[sk_class]);

		}
	}

	if(set_line < 99) f_win_man(1);
	else f_win_man(14);
}

//################## skill window close ##################
function skill_close()
{
	document.getElementById("skill_selwin").style.visibility = "hidden";
	document.skill_win.skill_chc.style.visibility = "hidden";
	document.skill_win.skill_chg0.style.visibility = "hidden";
	document.skill_win.skill_chg1.style.visibility = "hidden";
}

//################## skill class is changed ##################
function skill_class()
{
	sk_cls = document.skill_win.skill_cls.selectedIndex * 1;
	skill_type = skill_conv(document.skill_win.skill_mcd.value * 1, 0, 0)
	selected_skill = document.skill_win.skill_skl.selectedIndex * 1;

	if(skill_type == 2){
		if(skill_rev[sk_cls] == 7){
			document.skill_win.skill_cls.selectedIndex = skill_exc[document.stats_sheet.chr_class.selectedIndex];
			sk_cls = skill_exc[document.stats_sheet.chr_class.selectedIndex];
		}
		sk_posi = skill_rev[sk_cls] * 3;
		for(i = 0; i < 3; i++) document.skill_win.skill_skl.options[i].text = panel_skill[sk_posi + i];
		for(i = 3; i < 33; i++) document.skill_win.skill_skl.options[i].text = "None";
		document.skill_win.skill_skl.selectedIndex = 1;
		document.skill_win.skill_skl.selectedIndex = 0;
		if(selected_skill < 3) document.skill_win.skill_skl.selectedIndex = selected_skill;
	}else if(skill_type == 5){
		if(skill_rev[sk_cls] == 7){
			document.skill_win.skill_cls.selectedIndex = 1;
			sk_cls = 1;
		}
		for(i = 0; i < 33; i++) document.skill_win.skill_skl.options[i].text = "None";
		document.skill_win.skill_skl.selectedIndex = 1;
		document.skill_win.skill_skl.selectedIndex = 0;
	}else{
		if(sk_cls > 12){
			document.skill_win.skill_cls.selectedIndex = 1;
			sk_cls = 1;
		}
		for(i = 0; i < 33; i++){
			sk_posi = skill_st[sk_cls] + i;
			if(sk_posi < skill_st[sk_cls + 1]){
				document.skill_win.skill_skl.options[i].text = skillname_data[sk_posi];
			}else{
				document.skill_win.skill_skl.options[i].text = "None";
			}
		}
		document.skill_win.skill_skl.selectedIndex = 1;
		document.skill_win.skill_skl.selectedIndex = 0;
		document.skill_win.skill_skl.selectedIndex = selected_skill;
		skill_selected(selected_skill);
	}
}

//################## skill is selected ##################
function skill_selected(sk_sel)
{
	if(document.skill_win.skill_skl.options[sk_sel].text == "None"){
		document.skill_win.skill_skl.selectedIndex = 1;
		document.skill_win.skill_skl.selectedIndex = 0;
	}
}

//################## skill chance is changed ##################
function skill_chance(sk_chc)
{
	sk_chc *= 1;

	if(isNaN(sk_chc) || (sk_chc < 0)) document.skill_win.skill_chc.value = 0;
	else if(sk_chc > 127) document.skill_win.skill_chc.value = 127;
}

//################## skill level is changed ##################
function skill_level(sk_lvl)
{
	if(edit_mode == 9) return;

	sk_lvl *= 1;
	skill_type = skill_conv(document.skill_win.skill_mcd.value * 1, 0, 0);

	if(((skill_type == 1) || (skill_type == 2) || (skill_type == 5)) && (sk_lvl > 7)){
		document.skill_win.skill_lvl.selectedIndex = 7;
		alert("注意！在1.10版本中您无法设置技能超过 +7");
	}else  if((skill_type == 6) && (sk_lvl > 31)){
		document.skill_win.skill_lvl.selectedIndex = 31;
		alert("注意！在1.10版本中您无法设置等级超过 31");
	}

}

//################## skill calculation ##################
function skill_cal()
{
	itemno0 = document.focus_sheet.pick_no.value * 1;
	itemno1 = document.skill_win.skill_item.value * 1;

	if((itemno1 > 0) && (itemno0 != itemno1)){
		alert("无法操作！计算中无法更改物品。");
		skill_close();
		return;
	}

	skill_line = document.skill_win.skill_line0.value * 1;
	mag_cd1 = document.skill_win.skill_mcd.value * 1;

	if(skill_line < 99){
		mag_cd0 = document.focus_sheet.opt_no[skill_line].value * 1;
		if(mag_cd0 != mag_cd1){
			alert("无法操作！计算中无法更改属性。");
			skill_close();
			return;
		}
	}

	sk_cls = document.skill_win.skill_cls.selectedIndex * 1;
	sk_sel = document.skill_win.skill_skl.selectedIndex * 1;
	sk_lvl = document.skill_win.skill_lvl.selectedIndex * 1;
	skill_type = skill_conv(document.skill_win.skill_mcd.value * 1, 0, 0);
	ans = 0;

	if(skill_type == 2){
		if(edit_mode == 0){
			ans = sk_lvl * 65536 + skill_rev[sk_cls] * 8 + sk_sel;
		}else{
			ans = sk_lvl * 32 + skill_rev[sk_cls] * 3 + sk_sel;
		}
	}else if(skill_type == 5){
		sk_cls = skill_rev[sk_cls];
		ans = sk_lvl * 8 + sk_cls;
	}else{
		sk_ID = skill_st[sk_cls] + sk_sel;

		if(skill_type == 1) ans = sk_lvl * 512 + sk_ID;
		else if(skill_type == 3){
			sk_chc = document.skill_win.skill_chc.value * 1;
			if(edit_mode == 0){
				ans =  sk_chc * 65536 + sk_ID * 64 + sk_lvl;
			}else{
				ans =  sk_chc * 16384 + sk_lvl * 512 + sk_ID;
			}
		}else if(skill_type == 4){
			sk_chg0 = document.skill_win.skill_chg0.selectedIndex * 1;
			sk_chg1 = document.skill_win.skill_chg1.selectedIndex * 1;

			if(sk_chg0 == 0) sk_charge0 = 255;
			else if(sk_chg0 == 1) sk_charge0 = 1;
			else if(sk_chg0 == 2) sk_charge0 = 0;

			if(sk_chg1 == 0) sk_charge1 = 255;
			else if(sk_chg1 == 1) sk_charge1 = 1;
			else if(sk_chg1 == 2) sk_charge1 = 0;

			if(edit_mode == 0){
				ans =  sk_charge1 * 16777216 + sk_charge0 * 65536 + sk_ID * 64 + sk_lvl;
			}else{
				ans =  sk_charge1 * 4194304 + sk_charge0 * 16384 + sk_lvl * 512 + sk_ID;
			}
		}else if(skill_type == 6){
			ans = sk_lvl * 512 + sk_ID;
		}else if(skill_type == 7){
			ans = sk_lvl * 512 + sk_ID;
		}
	}

	if(skill_line < 99){
		document.focus_sheet.opt_val[skill_line].value = ans;
		mopt_value[itemno0][skill_line] = ans;
	}else{
		document.bat_form.bat_value.value = ans;
	}

	optname_write(skill_line, mag_cd1);

	skill_close();
}

//################## Skill converter number <-> each parameter ##################
function skill_conv(optcd, opt_value, ans_type)
//ans_type		0:skill type 1:each parameters
//skill_type	0:not skill 1:improve 2:panel 3:chance 4:charge 5:class skill 6:equipped aura 7:non-class skill
{
//get skill_type
	if(edit_mode == 0){
		if(optcd == 107) skill_type = 1;
		else if(optcd == 188) skill_type = 2;
		else if((optcd == 195) || (optcd == 198) ||(optcd == 201)) skill_type = 3;
		else if(optcd == 204) skill_type = 4;
		else if(optcd ==  83) skill_type = 5;
		else if(optcd == 151) skill_type = 6;
		else if(optcd ==  97) skill_type = 7;
		else skill_type = 0;
	}else{
		if(((optcd >= 107) && (optcd <= 109)) || ((optcd >= 181) && (optcd <= 187))) skill_type = 1;
		else if((optcd >= 188) && (optcd <= 193)) skill_type = 2;
		else if((optcd >= 195) && (optcd <= 203)) skill_type = 3;
		else if((optcd >= 204) && (optcd <= 213)) skill_type = 4;
		else skill_type = 0;
	}

	if(ans_type == 0) return skill_type;

//get each parameters
	switch(skill_type){
		case 0:
			sk_ID = 0;
			sk_lvl = 0;
			sk_chc = 0;
			sk_chg0 = 0;
			sk_chg1 = 0;
			sk_name = "";
			break;
		case 1:
			sk_lvl = opt_value >>> 9 * 1;
			sk_ID = opt_value & 511 * 1;
			sk_chc = 0;
			sk_chg0 = 0;
			sk_chg1 = 0;
			sk_name = get_moptbit(optcd, 2, edit_mode).substr(14) + " Improve: +" + sk_lvl + " " + get_skillname(sk_ID,0);
			break;
		case 2:
		if(edit_mode == 0){
			sk_lvl = opt_value >>> 16 * 1;
			sk_ID = (opt_value >>> 3 & 7) * 3 + (opt_value & 7) * 1;
			sk_chc = 0;
			sk_chg0 = 0;
			sk_chg1 = 0;
			sk_name = "Pannel:" + " +" + sk_lvl + " " + get_skillname(sk_ID,1);
		}else{
			sk_lvl = opt_value >>> 5 * 1;
			sk_ID = opt_value & 31 * 1;
			sk_chc = 0;
			sk_chg0 = 0;
			sk_chg1 = 0;
			sk_name = "Pa-" + get_moptbit(optcd, 2, edit_mode).charAt(20) + ": +" + sk_lvl + " " + get_skillname(sk_ID,1);
		}
			break;
		case 3:
		if(edit_mode == 0){
			sk_chc = opt_value >>> 16 * 1;
			sk_ID = opt_value >>> 6 & 1023 * 1;
			sk_lvl = opt_value & 63 * 1;
			sk_chg0 = 0;
			sk_chg1 = 0;
			sk_name = get_moptbit(optcd, 2, edit_mode).substr(5) + ": " + sk_chc + "% L" + sk_lvl + " " + get_skillname(sk_ID,0);
		}else{
			sk_chc = opt_value >>> 14 * 1;
			sk_lvl = opt_value >>> 9 & 31 * 1;
			sk_ID = opt_value & 511 * 1;
			sk_chg0 = 0;
			sk_chg1 = 0;
			sk_name = get_moptbit(optcd, 2, edit_mode).substr(5) + ": " + sk_chc + "% L" + sk_lvl + " " + get_skillname(sk_ID,0);
		}
			break;
		case 4:
		if(edit_mode == 0){
			sk_chg1 = opt_value >>> 24 * 1;
			sk_chg0 = opt_value >>> 16 & 255 * 1;
			sk_ID = opt_value >>> 6 & 1023 * 1;
			sk_lvl = opt_value & 63 * 1;
			sk_name = "Charge: " + sk_chg0 + "/" + sk_chg1 + " L" + sk_lvl + " " + get_skillname(sk_ID,0);
		}else{
			sk_chg1 = opt_value >>> 22 * 1;
			sk_chg0 = opt_value >>> 14 & 255 * 1;
			sk_lvl = opt_value >>> 9 & 31 * 1;
			sk_ID = opt_value & 511 * 1;
			sk_name = get_moptbit(optcd, 2, edit_mode).charAt(13) + ": " + sk_chg0 + "/" + sk_chg1 + " L" + sk_lvl + " " + get_skillname(sk_ID,0);
		}
			sk_chc = 0;
			break;
		case 5:
			sk_lvl = opt_value >>> 3 & 7 * 1;
			sk_class = opt_value & 7 * 1;
			dum = "AmazonSorce Necro Pally Barb  Druid Sassy ";
			sk_name = "+" + sk_lvl + " Skill Lvl: " + dum.substr(sk_class * 6,6);
			sk_class = skill_exc[sk_class];
			break;
		case 6:
			sk_lvl = opt_value >>> 9 & 31 * 1;
			sk_ID = opt_value & 511
			sk_name = "L" + sk_lvl + " " + get_skillname(sk_ID,0) + " 灵气(光环)";
			break;
		case 7:
			sk_lvl = opt_value >>> 9 & 63 * 1;
			sk_ID = opt_value & 511
			sk_name = "+" + sk_lvl + " " + get_skillname(sk_ID,0) + " (无等级)";
			break;
	}

	if(skill_type != 5) sk_class = get_skillclass(sk_ID, skill_type);

	return skill_type;
}

//################## Skill name get ##################
function get_skillname(skill_ID0, flg)
{
	ans = "Unknown";

	if(flg == 0){
		if(skill_ID0 < 357) ans = skillname_data[skill_ID0];
	}else if((skill_ID0 >= 0) && (skill_ID0 <= 20)){
		ans = panel_skill[skill_ID0];
	}

	return ans;
}

//################## Skill Class get ##################
function get_skillclass(skill_ID0, skill_type0)
{
	ans = 0;

	if(skill_type0 == 2){
		ans = Math.floor(skill_ID0 / 3);
		if(ans > 6) ans = 0;
		ans = skill_exc[ans];
	}else{
		for(is = 0; is < 13; is++) if(skill_ID0 >= skill_st[is]) ans = is;
	}

	return ans;
}

//============================================================================= Item reminder
//################## open Item reminder ##################
function remind_open()
{
	document.getElementById("remind_win").style.zIndex = 95;

	if(document.remind_sheet.remind_list.options[0].text == "") set_remindList();

	f_win_man(5);
}

//################## close Item reminder ##################
function remind_close()
{
	document.getElementById("remind_win").style.visibility = "hidden";
/*
　　expireDate = new Date;
　　expireDate.setMonth(expireDate.getMonth()+60);
expireDate.toGMTString();
alert(expireDate.toGMTString());
alert(document.cookie);
// */
}

//################## get Remind ID ##################
function get_remindID(remind_no)
{
	remind_cookie = document.cookie;

	any = remind_cookie.indexOf("REMIND" + remind_no + ".", 0);

	if(any > -1){
		remind_cookie = remind_cookie.substring(any);
		st = remind_cookie.indexOf("=", 0) + 1;
		en = remind_cookie.indexOf("|", st);
		return remind_cookie.substring(st, en);
	}
	return "";
}

//################## get Remind Data ##################
function get_remindData(remind_no)
{
	remind_cookie = document.cookie + ";";

	any = remind_cookie.indexOf("REMIND" + remind_no + ".", 0);

	if(any > -1){
		remind_cookie = remind_cookie.substring(any);
		st = remind_cookie.indexOf("|", 0) + 1;
		en = remind_cookie.indexOf("|", st);
		return remind_cookie.substring(st, en);
	}
	return "";
}

//################## set Remind list ##################
function set_remindList()
{
	for(i = 0; i < 20; i++) document.remind_sheet.remind_list.options[i].text = (i+1) + ": " + remindID[i];
}

//################## save cookie ##################
function save_cookie()
{
	for(i = 0; i < 20; i++){
		remind_cookie = "REMIND" + i + ".=" + remindID[i] + "|" + remindData[i] + "|; expires=Fri, 31-Dec-2030 23:59:59 UTC";
		document.cookie = remind_cookie;
	}
}

//################## save item data ##################
function remind_save(remind_no)
{
	var itemno = document.focus_sheet.pick_no.value * 1;

	if(isNaN(itemno) || (itemno == 0) || isNaN(remind_no) || (remind_no < 0)) return;

	if(remindID[remind_no] != ""){
		if(confirm("您是否要取代？") == false) return;
	}

	remind_name = prompt("保存该物品为：");

	if((remind_name == null) || (remind_name == "")){
		return;
	}

	remindID[remind_no] = ((edit_mode == 0) ? "v1.10" : "v1.09") + ": " + remind_name + "(" + get_info(item_DBno[itemno],15) + ")";

	remindData0 = "4A4D" + cre_itemsub1(itemno);

	if(item_socketed[itemno]){
		for(main_j = 1; main_j <= item_socketed[itemno]; main_j++){
			remindData0 = remindData0 + "4A4D" + cre_itemsub1(item_glued_no[itemno][main_j]);
		}
	}

	remindData[remind_no] = remindData0.toUpperCase();

	save_cookie();
	set_remindList();

	remind_close();
}

//################## Load item data ##################
function remind_load(remind_no)
{
	if(isNaN(remind_no * 1) || (remind_no < 0)) return;

	if(remindID[remind_no] == "") return;

	if((document.focus_sheet.item_is_picked.value * 1)){
		alert("载入前请先放下该物品");
		return;
	}

	if(remindID[remind_no].substr(0,5) == "v1.10") document.inex_sheet.inex_select.selectedIndex = 0;
	else document.inex_sheet.inex_select.selectedIndex = 1;

	item_import_main(remindData[remind_no]);
	remind_close();
}

//################## delete item data ##################
function remind_delete(remind_no)
{
	if(isNaN(remind_no * 1) || (remind_no < 0)) return;

	if(remindID[remind_no] == "") return;

	if(confirm("您是否要删除？") == false) return;

	remindID[remind_no] = "";
	remindData[remind_no] = "";

	save_cookie();
	set_remindList();

	alert("Deleted.");
}

//============================================================================= batch modifier
//################## open batch sheet ##################
function open_batsheet()
{
	change_bat_type(document.bat_form.bat_type.selectedIndex);
	document.bat_form.bat_attname.disabled = true;
	f_win_man(12);
}

//################## close batch sheet ##################
function close_batsheet()
{
	document.getElementById("batch_sheet").style.visibility = "hidden";
	document.bat_form.bat_value.style.visibility = "hidden";
}

//################## batch type ##################
function change_bat_type(selected)
{
	selected *=1;

	document.getElementById("bat_tofrom").innerHTML = "";
	document.getElementById("bat_tofrom").innerHTML = ((selected == 0) ? "to" : "from");
	document.bat_form.bat_value.style.visibility = ((selected == 0) ? "visible" : "hidden");
	change_bat_att(document.bat_form.bat_att.value);
}

//################## batch attr ##################
function change_bat_att(selected)
{
	document.bat_form.bat_value.value = value_chk(selected,document.bat_form.bat_value.value);
	optname_write(99,selected);
}

//################## batch value ##################
function click_bat_val()
{
	if(skill_conv(document.bat_form.bat_att.value * 1, 0, 0)) skill_open(99);
	else if(get_moptbit(document.bat_form.bat_att.value * 1,4, edit_mode) > 0) multi_open(99);
}

//################## batch value ##################
function change_bat_val(input_val)
{
	input_val *= 1;

	if(isNaN(input_val)){
		alert("请输入数字");
		document.bat_form.bat_value.select();
		document.bat_form.bat_value.focus();
		return;
	}

	document.bat_form.bat_value.value = value_chk(document.bat_form.bat_att.value,input_val);
	optname_write(99,document.bat_form.bat_att.value);
}

//################## batch process ##################
function bat_proceed()
{
	if(item_cnt < 1){
		alert("No item.");
		return;
	}

	bat_type0 = document.bat_form.bat_type.selectedIndex * 1;
	bat_att0 = document.bat_form.bat_att.value * 1;
	bat_value0 = document.bat_form.bat_value.value * 1;
	bat_item0 = document.bat_form.bat_item.selectedIndex * 1;
	bat_place0 = document.bat_form.bat_place.selectedIndex * 1;
	proceed_cnt = 0;

	for(i = 1; i <= item_cnt; i++){
		dum0 = 1;
		dum1 = get_info(item_DBno[i],3);

		if(item_deadflg[i] == 0) dum0 = 0;

		if((dum1 == "w") || (dum1 == "x") || (dum1 == "e") || (dum1 == "f") || (dum1 == "g") || (dum1 == "h") || (dum1 == "i") || (dum1 == "k") || (dum1 == "j")) dum0 = 0;

		switch(bat_item0){
		case 0:
			if((item_typeCD[i] != "cm1") && (item_typeCD[i] != "cm2") && (item_typeCD[i] != "cm3")) dum0 = 0;
			break;
		case 1:
			if((item_typeCD[i] != "cm1") && (item_typeCD[i] != "cm2") && (item_typeCD[i] != "cm3")) dum0 = 0;
			else if(item_pictype[i] != 0) dum0 = 0;
			break;
		case 2:
			if((item_typeCD[i] != "cm1") && (item_typeCD[i] != "cm2") && (item_typeCD[i] != "cm3")) dum0 = 0;
			else if(item_pictype[i] != 1) dum0 = 0;
			break;
		case 3:
			if((item_typeCD[i] != "cm1") && (item_typeCD[i] != "cm2") && (item_typeCD[i] != "cm3")) dum0 = 0;
			else if(item_pictype[i] != 2) dum0 = 0;
			break;
		case 4:
			if(item_typeCD[i] != "jew") dum0 = 0;
			break;
		case 5:
			if(item_typeCD[i] != "jew") dum0 = 0;
			else if(item_pictype[i] != 0) dum0 = 0;
			break;
		case 6:
			if(item_typeCD[i] != "jew") dum0 = 0;
			else if(item_pictype[i] != 1) dum0 = 0;
			break;
		case 7:
			if(item_typeCD[i] != "jew") dum0 = 0;
			else if(item_pictype[i] != 2) dum0 = 0;
			break;
		case 8:
			if(item_typeCD[i] != "jew") dum0 = 0;
			else if(item_pictype[i] != 3) dum0 = 0;
			break;
		case 9:
			if(item_typeCD[i] != "jew") dum0 = 0;
			else if(item_pictype[i] != 4) dum0 = 0;
			break;
		case 10:
			if(item_typeCD[i] != "jew") dum0 = 0;
			else if(item_pictype[i] != 5) dum0 = 0;
			break;
		}

		switch(bat_place0){
		case 0:
			if(item_location[i] != "Invent") dum0 = 0;
			break;
		case 1:
			if(item_location[i] != "Equiped") dum0 = 0;
			break;
		case 2:
			if(item_location[i] != "Cube") dum0 = 0;
			break;
		case 3:
			if(item_location[i] != "Stash") dum0 = 0;
			break;
		case 4:
			if(item_owner[i] != 1) dum0 = 0;
			break;
		case 5:
			if(item_owner[i] != 2) dum0 = 0;
			break;
		}

		if((bat_type0 == 0) && (mopt_no[i] > 30))dum0 = 0;

		if(dum0 == 1){
			dum2 = 99;

			for(j = 0; j < mopt_no[i]; j++) if(bat_att0 == mopt_cd[i][j]) dum2 = j;

			if((bat_type0 == 0) && (dum2 < 99)){
				if((edit_mode == 0) && (bat_att0 != 83) && (bat_att0 != 97) && (bat_att0 != 98) && (bat_att0 != 107) && (bat_att0 != 126) && (bat_att0 != 151) && (bat_att0 != 188) && ((bat_att0 < 195) || (bat_att0 > 213))) dum0 = 0;
			}

			if((bat_type0 == 1) && (dum2 == 99)) dum0 = 0;
		}

		if(dum0 == 1){
			if(bat_type0 == 0){
				mopt_cd[i][mopt_no[i]] = bat_att0;
				mopt_value[i][mopt_no[i]++] = bat_value0 + get_moptbit(bat_att0,1,edit_mode);
			}
			else{
				for(j = 0; j < mopt_no[i]; j++){
					if(bat_att0 == mopt_cd[i][j]){
						for(jj = j; jj < 30; jj++){
							mopt_cd[i][jj] = mopt_cd[i][jj + 1];
							mopt_value[i][jj] = mopt_value[i][jj + 1];
						}
						mopt_cd[i][30] = "";
						mopt_value[i][30] = "";
						mopt_no[i]--;
						j--
					}
				}
			}
			proceed_cnt++;
		}
	}
	reset_focus();
	alert("Complete ("+proceed_cnt+" items).");
}

//============================================================================= Mercenary and Golem window
//################## open Mercenary window ##################
function open_mercgolem()
{
	obj = document.getElementById("mercgolem_win");
	obj.style.left = document.body.scrollLeft + 35;
	obj.style.top = document.body.scrollTop + 50;

	obj.style.visibility = "visible";
}

//################## close Mercenary window ##################
function close_mercgolem()
{
	document.getElementById("mercgolem_win").style.visibility = "hidden";
}

//============================================================================= Create Data section
//################## Create Character Data ##################
function create_data()
{
	if((edit_mode == 9) &&(stats_chk9() == 1)) return;
	if((edit_mode == 0) &&(stats_chk0() == 1)) return;

	if(edit_mode == 0){
		hex_head = "55AA55AA60000000";	//
	}else{
		hex_head = "55AA55AA5C000000";	//
	}

	hex_ans0 = "00000000";			// 16	always zero
	hex_ans0+= cre_charname();		// 20
	hex_ans0+= "20";				// 36
	hex_ans0+= cre_progression();	// 37
	hex_ans0+= "0000";				// 
	hex_ans0+= cre_class();			// 40
	hex_ans0+= "101E";				// 41
	hex_ans0+= cre_level1();		// 43
	hex_ans0+= "00000000";			// 44
	hex_ans0+= cre_UTCtime();		// 48	UTC time stamp
	hex_ans0+= "FFFFFFFF";			// 52
	hex_ans0+= cre_skillkey();		// 56	4 x 20skills
	hex_ans0+= wearing0;	// 136 wearing in select screen
	hex_ans0+= "800000";			// 168	where you playing
	hex_ans0+= "0DA1931C";			// 171	?
	hex_ans0+= "0000";				// 175
	hex_ans0+= cre_mercID();		// 177	E5 0F 44 62 
	hex_ans0+= cre_mercdata();		// 183
	hex_ans0+= cre_repeat("00",144);	// 191

	hex_ans1 = "576F6F21";			// 335	Woo! ?
	hex_ans1+= "060000002A01";		// 339
	hex_ans1+= "01000110011001100110011001100100";	// quest data (apply all)
	hex_ans1+= "00000110011001100110011001100100";
	hex_ans1+= "00000110011001100110011001100100";
	hex_ans1+= "01000110011201100100000000000000";
	hex_ans1+= "00000000000001100110011001100110";
	hex_ans1+= "51170000000000000000000000000100";
	hex_ans1+= "01000110011001100110011001100100";
	hex_ans1+= "00000110011001100110011001100100";
	hex_ans1+= "00000110011001100110011001100100";
	hex_ans1+= "01000110011201100120000000000000";
	hex_ans1+= "00000000000001100110011001100110";
	hex_ans1+= "51170000000000000000000000000100";
	hex_ans1+= "01000110011001100110011001100100";
	hex_ans1+= "00000110011001100110011001100100";
	hex_ans1+= "00000110011001100110011001100100";
	hex_ans1+= "01000110011201100100000000000000";
	hex_ans1+= "00000000000001100110011001100110";
	hex_ans1+= "51170000000000000000000000000000";

	hex_ans1+= "5753010000005000";	// 633	WS....P.
	hex_ans1+= "0201FFFFFFFFFFFFFFFFFFFFFFFFFFFF";	// 633	way point
	hex_ans1+= "00000000000000000201FFFFFFFFFFFF";
	hex_ans1+= "FFFFFFFFFFFFFFFF0000000000000000";
	hex_ans1+= "0201FFFFFFFFFFFFFFFFFFFFFFFFFFFF";
	hex_ans1+= "000000000000000001";

	hex_ans1+= "773400AEBEA5B907000000AEBEA5F907";	// 714	talk to NPC
	hex_ans1+= "000000AEBEA5B9070000000000000000";
	hex_ans1+= "00000000000000000000000000000000";
	hex_ans1+= "000000";

	hex_ans2 = "6766";				// 765 gf	starting character stats data
	hex_ans2+= cre_statdata();

	hex_ans2+= "6966";				// if	 character skill data
	hex_ans2+= cre_skilldata();

	hex_ans2+= cre_itemdata();		//  character item data

//file size
	hex_dum = hex_head + hex_ans0 + hex_ans1 + hex_ans2;
	hex_size = hex_dum.length / 2 + 8;

//check sum
	hex_dum = hex_head + dec_hex(hex_size,4) + "00000000" + hex_ans0 + hex_ans1 + hex_ans2;
	hex_chksum = checksum(hex_dum);
	hex_dum = hex_head + dec_hex(hex_size,4) + dec_hex(hex_chksum,4) + hex_ans0 + hex_ans1 + hex_ans2;
	hex_dum = hex_dum.toUpperCase();
	hex_ans = "";
	saveName= document.stats_sheet.chr_name.value + ".d2s";
	if(document.last_sheet.use_debug.checked){
		//GenerateHEXdata(hex_ans);
		var filesize = hex_dum.length / 2;
		for(i = 0; i < hex_dum.length; i+=2) hex_ans += String.fromCharCode(32) + hex_dum.substr(i,2);
		for(hex_dum = "",i = 0; i*48 < hex_ans.length; i++) hex_dum += "e" + tohex(i+16,16) + "0" + hex_ans.substr(i*48,48) + String.fromCharCode(13);
		hex_dum += "rcx" + String.fromCharCode(13) + tohex(filesize,16) + String.fromCharCode(13) + "n" + saveName + String.fromCharCode(13) + "w" + String.fromCharCode(13) + "q" + String.fromCharCode(13) + ":begin" + String.fromCharCode(13) + "debug<%0>nul" + String.fromCharCode(13);
		hex_dum = ";@echo off" + String.fromCharCode(13) + ";goto begin" + String.fromCharCode(13) + hex_dum;
		document.last_sheet.hex_answer.value = hex_dum;
	}
	else{
		//WriteBatchFile(hex_ans);加换行
		for(i = 0; i < hex_dum.length; i+=64) hex_ans += hex_dum.substr(i,64) + String.fromCharCode(13);
		document.last_sheet.hex_answer.value = hex_ans;
		saveD2s(hex_dum,saveName);
	}
	document.getElementById("charname").innerHTML = saveName;
	document.last_sheet.hex_answer.focus();
	document.last_sheet.hex_answer.select();
	alert("=== 存档建立成功！ ===");	// + tohex(256,16));删除
}

function tohex(num,bit)
{
	var byte=num%bit,i,hexChars="0123456789ABCDEF",hexstring="";
	for(i=0;parseInt(num)>0;i++)
	{
		hexstring=hexChars.charAt(byte)+hexstring;
		num/=bit;
		byte=num%bit;
	}
	return hexstring;
}

//################## stats check for version 1.09 ##################
function stats_chk9()
{
	if(document.last_sheet.non_check.checked) return 0;

//============ character chks ============

//chr name length check
	if(document.stats_sheet.chr_name.value.length < 2){
		alert("请输入人物名称 (2-15 英文字母)");
		return 1;
	}

//chr name letters check
	errorchr = "";

	for(i = (document.stats_sheet.chr_name.value.length - 1); i >= 0; i--){
		strcd = document.stats_sheet.chr_name.value.charCodeAt(i);
		if(((strcd < 65) && (strcd != 45)) || (strcd > 122) || ((strcd > 90) && (strcd < 97) && (strcd != 95))) errorchr = String.fromCharCode(strcd);
	}

	if(errorchr != ""){
		alert("< " + errorchr + " > 是错误的字符！");
		return 1;
	}

//chr lvl check
	chk_val = document.stats_sheet.chr_lvl.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物等级 (1-2147483647)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 2147483647)){
		alert("错误的人物等级 (1-2147483647)");
		return 1;
	}
	if(chk_val > 99){
		alert("警告：过高的人物等级有时可能会导致游戏出错！");
	}

//strength chk
	chk_val = document.stats_sheet.chr_str.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的力量 (1-2147483647)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 2147483647)){
		alert("错误的人物力量 (1-2147483647)");
		return 1;
	}

//dexterity chk
	chk_val = document.stats_sheet.chr_dex.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的敏捷 (1-2147483647)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 2147483647)){
		alert("错误的人物敏捷 (1-2147483647)");
		return 1;
	}

//vitality chk
	chk_val = document.stats_sheet.chr_vit.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的体力 (1-2147483647)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 2147483647)){
		alert("错误的人物体力 (1-2147483647)");
		return 1;
	}

//energy chk
	chk_val = document.stats_sheet.chr_ene.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的精力 (1-2147483647)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 2147483647)){
		alert("错误的人物精力 (1-2147483647)");
		return 1;
	}

//current life chk
	chk_val = document.stats_sheet.chr_life0.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物当前生命 (1-8388607)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8388607)){
		alert("错误的人物当前生命 (1-8388607)");
		return 1;
	}
	if(chk_val > 8300000){
		alert("警告：生命值设置过高可能导致游戏中对战时暴毙！\n (生命值的最高上限可能大约为8388607)");
	}

//maximum life chk
	chk_val = document.stats_sheet.chr_life1.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物最大生命 (1-8388607)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8388607)){
		alert("错误的人物最大生命 (1-8388607)");
		return 1;
	}
	if(chk_val > 8300000){
		alert("警告：生命值设置过高可能导致游戏中对战时暴毙！\n (生命值的最高上限可能大约为8388607)");
	}

//current mana chk
	chk_val = document.stats_sheet.chr_mana0.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物当前法力 (1-8388607)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8388607)){
		alert("错误的人物当前法力 (1-8388607)");
		return 1;
	}

//max mana chk
	chk_val = document.stats_sheet.chr_mana1.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物最大法力 (1-8388607)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8388607)){
		alert("错误的人物最大法力 (1-8388607)");
		return 1;
	}

//current stamina chk
	chk_val = document.stats_sheet.chr_sta0.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物当前耐力 (1-8388607)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8388607)){
		alert("错误的人物当前耐力 (1-8388607)");
		return 1;
	}

//max stamina chk
	chk_val = document.stats_sheet.chr_sta1.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物最大耐力 (1-8388607)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8388607)){
		alert("错误的人物最大耐力 (1-8388607)");
		return 1;
	}

//mercenary exp chk
	if(document.merc_edit.mercon.checked){
		chk_val = document.merc_edit.merc_exp.value * 1;
		if(isNaN(chk_val)){
			alert("请输入雇佣兵的经验值\n 如果您不知该如何设置，请设为最大经验值。.");
			return 1;
		}
	}

	return 0;
}

//################## stats check for version 1.10 ##################
function stats_chk0()
{
	if(document.last_sheet.non_check.checked) return 0;

//============ character chks ============

//chr name length check
	if(document.stats_sheet.chr_name.value.length < 2){
		alert("请输入人物名称 (2-15 英文字母)");
		return 1;
	}

//chr name letters check
	errorchr = "";

	for(i = (document.stats_sheet.chr_name.value.length - 1); i >= 0; i--){
		strcd = document.stats_sheet.chr_name.value.charCodeAt(i);
		if(((strcd < 65) && (strcd != 45)) || (strcd > 122) || ((strcd > 90) && (strcd < 97) && (strcd != 95))) errorchr = String.fromCharCode(strcd);
	}

	if(errorchr != ""){
		alert("< " + errorchr + " > 是错误的字符！");
		return 1;
	}

//chr lvl check
	chk_val = document.stats_sheet.chr_lvl.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物等级 (1-127)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 127)){
		alert("错误的人物等级 (1-127)");
		return 1;
	}

//strength chk
	chk_val = document.stats_sheet.chr_str.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的力量 (1-1023)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 1023)){
		alert("错误的人物力量 (1-1023)");
		return 1;
	}

//dexterity chk
	chk_val = document.stats_sheet.chr_dex.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的敏捷 (1-1023)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 1023)){
		alert("错误的人物敏捷 (1-1023)");
		return 1;
	}

//vitality chk
	chk_val = document.stats_sheet.chr_vit.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的体力 (1-1023)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 1023)){
		alert("错误的人物体力 (1-1023)");
		return 1;
	}

//energy chk
	chk_val = document.stats_sheet.chr_ene.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物的精力 (1-1023)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 1023)){
		alert("错误的人物精力 (1-1023)");
		return 1;
	}

//current life chk
	chk_val = document.stats_sheet.chr_life0.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物当前生命 (1-8191.99609375)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8191.99609375)){
		alert("错误的人物当前生命 (1-8191.99609375)");
		return 1;
	}

//maximum life chk
	chk_val = document.stats_sheet.chr_life1.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物最大生命 (1-8191.99609375)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8191.99609375)){
		alert("错误的人物最大生命 (1-8191.99609375)");
		return 1;
	}

//current mana chk
	chk_val = document.stats_sheet.chr_mana0.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物当前法力 (1-8191.99609375)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8191.99609375)){
		alert("错误的人物当前法力 (1-8191.99609375)");
		return 1;
	}

//max mana chk
	chk_val = document.stats_sheet.chr_mana1.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物最大法力 (1-8191.99609375)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8191.99609375)){
		alert("错误的人物最大法力 (1-8191.99609375)");
		return 1;
	}

//current stamina chk
	chk_val = document.stats_sheet.chr_sta0.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物当前耐力 (1-8191.99609375)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8191.99609375)){
		alert("错误的人物当前耐力 (1-8191.99609375)");
		return 1;
	}

//max stamina chk
	chk_val = document.stats_sheet.chr_sta1.value * 1;
	if(isNaN(chk_val)){
		alert("请输入人物最大耐力 (1-8191.99609375)");
		return 1;
	}
	if((chk_val < 1) || (chk_val > 8191.99609375)){
		alert("错误的人物最大耐力 (1-8191.99609375)");
		return 1;
	}

//mercenary exp chk
	if(document.merc_edit.mercon.checked){
		chk_val = document.merc_edit.merc_exp.value * 1;
		if(isNaN(chk_val)){
			alert("请输入雇佣兵的经验值\n 如果您不知该如何设置，请设置为最大经验值。");
			return 1;
		}
	}

	return 0;
}

//################## Create Repeating same Data ##################
function cre_repeat(repeatdata,times)
{
	ans = "";
	for(ii = 0; ii < times; ii++) ans+= repeatdata;
	return ans;
}

//################## 10 -> 16 ##################
function dec_hex(deccode,leng)
{
	ans = "";

	hexcode = "000000000" + parseInt(deccode).toString(16);
	hexcode = hexcode.substr(hexcode.length - (leng * 2), leng * 2);

	for(ii = 1; ii < hexcode.length; ii+=2) ans = hexcode.substr(ii - 1, 2) + ans;

	return ans;
}

//################## 10 -> 2 ##################
function dec_bit(deccode,leng)
{
	bitcode = "00000000000000000000000000000000000000" + deccode.toString(2);

	return bitcode.substr(bitcode.length - leng, leng);
}

//################## chr -> 16 or 2 ##################
function chr_hexbit(chrcode,sflg,nbit)
{
	ans = "";

	for(ii = 0; ii < chrcode.length; ii++) {
		chrdec = chrcode.charCodeAt(ii);
		if(sflg == 0){
			ans += chrdec.toString(16);
		}
		else{
			ans = dec_bit(chrdec, nbit) + ans;
		}
	}

	return ans;
}

//################## Character Name ##################
function cre_charname()
{
	ans1 = chr_hexbit(document.stats_sheet.chr_name.value, 0, 0);

	for(ii = ans1.length; ii < 32; ii++) ans1 += "0";

	return ans1;
}

//################## Character Progression ##################
function cre_progression()
{
	dum1 = document.stats_sheet.chr_prog.selectedIndex * 1;
	ans1 = "00";

	if(dum1 == 0) ans1 = "03";
	else if(dum1 == 1) ans1 = "08";
	else if(dum1 == 2) ans1 = "0D";
	else if(dum1 == 3) ans1 = "0F";

	return ans1;
}

//################## Character Class ##################
function cre_class()
{
	return ("0" + document.stats_sheet.chr_class.selectedIndex);
}

//################## Character Level ##################
function cre_level1()
{
	return dec_hex(document.stats_sheet.chr_lvl.value * 1, 1).substr(0,2);
}

//################## UTC time stamp ##################
function cre_UTCtime()
{
	todayUTC = new Date();
	todayUTC2 = Math.floor(todayUTC / 1000) + 2208988800;

	return dec_hex(todayUTC2, 4);
}

//################## Skill key set ##################
function cre_skillkey()
{
	ans1 = "";

	get_allskill();

	for(i = 0; i < 20; i++){
		for(j = 0; j < all_skill_max; j++) if(skey_ID[i] == all_skill_ID[j]) break;
		if(j == all_skill_max){
			skey_ID[i] = (-1)
		}else{
			skey_item[i] = all_skill_item[j];
		}
	}

	for(i = 0; i < 20; i++){
		if(skey_ID[i] < 0){
			if(i < 16){
				ans1 += "FFFF0000";
			}else{
				ans1 += "00000000";
			}
		}else{
			if(i < 16){
				ans1 += dec_hex(skey_item[i] * 65536 - (skey_LR[i] - 1) * 32768 + skey_ID[i], 4);
			}else{
				ans1 += dec_hex(skey_item[i] * 65536 + skey_ID[i], 4);
			}
		}
	}

	return ans1;
}

//################## Mercnary ID ##################
function cre_mercID()
{
	ans1 = "0000";

	if(document.merc_edit.mercon.checked){
		if(document.merc_edit.mercdie.checked) ans1 = "0100";
		if(merc_ID0 != "00000000"){
			merc_ID0 = "00000000" + merc_ID0;
			merc_ID0 = merc_ID0.substr(merc_ID0.length - 8, 8);
			return ans1 + merc_ID0;
		}
		else{
			return ans1 + "E50F4462"; // maybe error when merc kill monster
		}
	}
	else{
		return "000000000000";
	}
}

//################## Mercnary Data ##################
function cre_mercdata()
{
	if(document.merc_edit.mercon.checked == false) return "0000000000000000";

	addcnt = 0;
	difbns = 0;

	if(document.merc_edit.merc_select[0].checked){
		addcnt = 0;
		difbns = 2;
		mercnamecd = document.merc_edit.roguename.selectedIndex;
		mercskillcd = document.merc_edit.rogue_skill.selectedIndex;
	}
	else if(document.merc_edit.merc_select[1].checked){
		addcnt = 6;
		difbns = 3;
		mercnamecd = document.merc_edit.desertname.selectedIndex;
		mercskillcd = document.merc_edit.desert_skill.selectedIndex;
	}
	else if(document.merc_edit.merc_select[2].checked){
		addcnt = 15;
		difbns = 3;
		mercnamecd = document.merc_edit.eastname.selectedIndex;
		mercskillcd = document.merc_edit.east_skill.selectedIndex;
	}
	else if(document.merc_edit.merc_select[3].checked){
		addcnt = 24;
		difbns = 2;
		mercnamecd = document.merc_edit.barbname.selectedIndex;
		mercskillcd = 0;
	}

	mercname = dec_hex(mercnamecd,2);
	merctype = dec_hex(addcnt + document.merc_edit.merc_dif.selectedIndex * difbns + mercskillcd, 2);
	mercexpe = dec_hex(document.merc_edit.merc_exp.value * 1, 4);

	ans1 = mercname + merctype + mercexpe;

	return ans1;
}

//################## Character Stats ##################
function cre_statdata()
{
	ans0 = "";
	ans1 = "";

	if(edit_mode == 0){
		ans1 = dec_bit(document.stats_sheet.chr_str.value * 1,10) + "000000000";
		ans1 = dec_bit(document.stats_sheet.chr_ene.value * 1,10) + "000000001" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_dex.value * 1,10) + "000000010" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_vit.value * 1,10) + "000000011" + ans1;

		dum2 = document.stats_sheet.chr_stat.value * 1;
		if(dum2 > 0) ans1 = dec_bit(dum2,10) + "000000100" + ans1;

		dum2 = document.stats_sheet.chr_skill.value * 1;
		if(dum2 > 0) ans1 = dec_bit(dum2,8) + "000000101" + ans1;

		ans1 = dec_bit(document.stats_sheet.chr_life0.value * 256,21) + "000000110" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_life1.value * 256,21) + "000000111" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_mana0.value * 256,21) + "000001000" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_mana1.value * 256,21) + "000001001" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_sta0.value * 256,21) + "000001010" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_sta1.value * 256,21) + "000001011" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_lvl.value * 1,7) + "000001100" + ans1;
		ans1 = dec_bit(document.stats_sheet.chr_exp0.value * 1,32) + "000001101" + ans1;

		dum2 = document.stats_sheet.chr_gold0.value * 1;
		if(dum2 > 0) ans1 = dec_bit(dum2,25) + "000001110" + ans1;

		dum2 = document.stats_sheet.chr_gold1.value * 1;
		if(dum2 > 0) ans1 = dec_bit(dum2,25) + "000001111" + ans1;

		ans1 = "111111111" + ans1;
		zeroadd = 8 - (ans1.length % 8);

		if(zeroadd < 8) for(iii = 0; iii < zeroadd; iii++) ans1 = "0" + ans1;

		for(iii = 0; iii < Math.floor(ans1.length / 8); iii++) ans0 = dec_hex(parseInt(ans1.substr(iii * 8, 8), 2), 1) + ans0;

	}else{
		dum1 = 65535;

		ans1 += dec_hex(document.stats_sheet.chr_str.value * 1, 4);
		ans1 += dec_hex(document.stats_sheet.chr_ene.value * 1, 4);
		ans1 += dec_hex(document.stats_sheet.chr_dex.value * 1, 4);
		ans1 += dec_hex(document.stats_sheet.chr_vit.value * 1, 4);

		dum2 = document.stats_sheet.chr_stat.value * 1;
		if(dum2 == 0){
			dum1 -= 16;
		}else{
			ans1 += dec_hex(dum2, 4);
		}

		dum2 = document.stats_sheet.chr_skill.value * 1;
		if(dum2 == 0){
			dum1 -= 32;
		}else{
			ans1 += dec_hex(dum2, 4);
		}

		ans1 += dec_hex(document.stats_sheet.chr_life0.value * 256, 4);
		ans1 += dec_hex(document.stats_sheet.chr_life1.value * 256, 4);
		ans1 += dec_hex(document.stats_sheet.chr_mana0.value * 256, 4);
		ans1 += dec_hex(document.stats_sheet.chr_mana1.value * 256, 4);
		ans1 += dec_hex(document.stats_sheet.chr_sta0.value * 256, 4);
		ans1 += dec_hex(document.stats_sheet.chr_sta1.value * 256, 4);
		ans1 += dec_hex(document.stats_sheet.chr_lvl.value * 1, 4);
		ans1 += dec_hex(document.stats_sheet.chr_exp0.value * 1, 4);

		dum2 = document.stats_sheet.chr_gold0.value * 1;
		if(dum2 == 0){
			dum1 -= 16384;
		}else{
			ans1 += dec_hex(dum2, 4);
		}

		dum2 = document.stats_sheet.chr_gold1.value * 1;
		if(dum2 == 0){
			dum1 -= 32768;
		}else{
			ans1 += dec_hex(dum2, 4);
		}

		ans0 = dec_hex(dum1,2) + ans1;
	}

	return ans0;
}

//################## Character Skills ##################
function cre_skilldata()
{
	ans1 = "";
	ans2 = "";
	ans3 = "";

	for(si = 0;si < 10; si++){
		ans1 += dec_hex(document.skill_sheet.elements[si * 3].selectedIndex * 1, 1);
		ans2 += dec_hex(document.skill_sheet.elements[si * 3 + 1].selectedIndex * 1, 1);
		ans3 += dec_hex(document.skill_sheet.elements[si * 3 + 2].selectedIndex * 1, 1);
	}

	ans = ans1 + ans2 + ans3;

	return ans;
}

//################## Items main ##################
function cre_itemdata()
{
	itemcount = new Array();
	itemcount[0] = 0;	//player
	itemcount[1] = 0;	//mercenary
	itemcount[2] = 0;	//golem

	itemparts = new Array();
	itemparts[0] = "";	//player
	itemparts[1] = "";	//mercenary
	itemparts[2] = "";	//golem

	var picking_item = 0;

	for(main_i = 1; main_i <= item_cnt; main_i++){
		if(item_deadflg[main_i] && (item_location[main_i] != "Inserted")){
			if((main_i == (document.focus_sheet.pick_no.value * 1)) && (document.focus_sheet.item_is_picked.value * 1)){
				pincking_item = main_i;
			}else{
				dum1 = "4A4D" + cre_itemsub1(main_i);
				itemparts[item_owner[main_i]]+= dum1;
				itemcount[item_owner[main_i]]++;

				if(item_socketed[main_i]){
					for(main_j = 1; main_j <= item_socketed[main_i]; main_j++){
						dum1 = "4A4D" + cre_itemsub1(item_glued_no[main_i][main_j]);
						itemparts[item_owner[main_i]]+= dum1;
					}
				}
			}
		}
	}

	if(picking_item){
		dum1 = "4A4D" + cre_itemsub1(picking_item);
		itemparts[0]+= dum1;
		itemcount[0]++;

		if(item_socketed[picking_item]){
			for(main_j = 1; main_j <= item_socketed[picking_item]; main_j++){
				dum1 = "4A4D" + cre_itemsub1(item_glued_no[picking_item][main_j]);
				itemparts[0]+= dum1;
			}
		}
	}

	itemparts0 = "4A4D";
	itemparts1 = "6A66";
	itemparts2 = "6B66";

//player item area
	itemparts0 = itemparts0 + dec_hex(itemcount[0],2) + itemparts[0] + "4A4D0000";

//mercenary item area
	if(document.merc_edit.mercon.checked) itemparts1 = itemparts1 + "4A4D" + dec_hex(itemcount[1],2) + itemparts[1];

//iron golem item area
	itemparts2 = itemparts2 + dec_hex(itemcount[2],1) + itemparts[2];

	ans = itemparts0 + itemparts1 + itemparts2;

	return ans;
}

//################## Items sub1 ##################
function cre_itemsub1(itemno)
{
	ans1 = cre_itemsub2(itemno);
	ans2 = "";
	chk = get_info(item_DBno[itemno],3);

	if((chk != "f") && (chk != "g") && (chk != "h") && (chk != "j") && (chk != "e")){
		//ans1 = "111111111" + ans1;
		zeroadd = 8 - (ans1.length % 8);
		if(zeroadd < 8) for(iii = 0; iii < zeroadd; iii++) ans1 = "0" + ans1;
	}

	for(iii = 0; iii < Math.floor(ans1.length / 8); iii++) ans2 = dec_hex(parseInt(ans1.substr(iii * 8, 8), 2), 1) + ans2;

	if((chk == "g") && (edit_mode == 0)){
		ans2 += "D0187713A453D50000000000";
	}

	return ans2;
}

//################## Items sub2 ##################
function cre_itemsub2(itemno)
{
	var endflagNum = 0; //511 属性的数量，即 结束标志 数量。
	for(jj = 0; jj < mopt_no[itemno]; jj++){
		if (parseInt(mopt_cd[itemno][jj]) == 511) endflagNum++;
	}
	if (parseInt(mopt_cd[itemno][mopt_no[itemno]-1]) != 511) endflagNum++;
	chk = get_info(item_DBno[itemno],3);
	ans1 = "00000010000";

//27 socket on?
	ans1 = (item_socket[itemno] ? "1" : "0") + ans1;

	ans1 = "0" + ans1;
	ans1 = "000" + ans1;

//32 ear?
	ans1 = ((item_typeCD[itemno] == "ear") ? "1" : "0") + ans1;

	ans1 = "0000" + ans1;

//37 simple item?
	ans1 = ((chk == "f") || (chk == "g") || (chk == "h") || (chk == "j") || (chk == "e") ? "1" : "0") + ans1;

//38 ethereal?
	ans1 = (item_ethereal[itemno] ? "1" : "0") + ans1;

	ans1 = "1" + ans1;

//40 personalized?
	ans1 = ((item_personal[itemno] != "") && (item_personal[itemno].charAt(item_personal[itemno].length - 1) != ")") ? "1" : "0") + ans1;

//41 未知
	ans1 = "0" + ans1;
//42 带神符之语属性 1:是 |0:否
    if ((item_quality[itemno] != 5 && endflagNum > 1) || endflagNum > 6)
        ans1 = "1" + ans1;
    else
        ans1 = "0" + ans1;
    //这里是神符之语的判断，下面注释的是上一个版本的做法，
    //原理是当大于某个ID时认为具备此属性，当前版本是根据
    //511属性的数量来判断，有需要则增加。有一个特殊情况：
    //当一个宝石同时具备套装和神符之语属性时，能加7列属性
    //当然了，在我写这个代码的时候，这种宝石还没有任何意义
    //其中套装的5个属性列表无法起作用，望来日有高手破解。

	//ans1 = ((item_DBno[itemno] > RUNEBEGIN) ? "1" : "0") + ans1;
//43 未知属性与常量
	ans1 = "000110010000000" + ans1;

//58 location
	storedflg = 0;
	if((itemno == (document.focus_sheet.pick_no.value * 1)) && (document.focus_sheet.item_is_picked.value * 1)){
		ans1 = "100" + ans1;
	}
	else if(item_location[itemno] == "Equiped"){
		ans1 = "001" + ans1;
	}
	else if(item_location[itemno] == "Belt"){
		ans1 = "010" + ans1;
	}
	else if(item_location[itemno] == "Inserted"){
		ans1 = "110" + ans1;
	}
	else{
		ans1 = "000" + ans1;
		storedflg = 1;
	}

//61 equipped where?
	if(item_location[itemno] == "Equiped"){
		if(item_owner[itemno] == 2){
			dum = get_info(item_DBno[itemno],3);
			if((dum == "A") || (dum == "D")){
				ans1 = dec_bit(1,4) + ans1;
			}else if(dum == "E"){
				ans1 = dec_bit(3,4) + ans1;
			}else if(dum == "I"){
				ans1 = dec_bit(10,4) + ans1;
			}else if(dum == "J"){
				ans1 = dec_bit(9,4) + ans1;
			}else if(dum == "K"){
				ans1 = dec_bit(8,4) + ans1;
			}else{
				ans1 = dec_bit(4,4) + ans1;
			}
		}else{
			ans1 = dec_bit(item_positionX[itemno],4) + ans1;
		}
	}else{
		ans1 = "0000" + ans1;
	}

//65,69 stored column and row
	if(item_location[itemno] != "Belt"){
		ans1 = dec_bit(item_positionY[itemno],3) + dec_bit(item_positionX[itemno],4) + ans1;
	}
	else{
		ans1 = "000" + dec_bit(item_positionY[itemno],2) + dec_bit(item_positionX[itemno],2) + ans1;
	}

	ans1 = "0" + ans1;

//73 stored where?
	if(storedflg == 1){
		if(item_location[itemno] == "Invent"){
			ans1 = "001" + ans1;
		}
		else if(item_location[itemno] == "Cube"){
			ans1 = "100" + ans1;
		}
		else if(item_location[itemno] == "Stash"){
			ans1 = "101" + ans1;
		}
		else{
			ans1 = "000" + ans1;
		}
	}
	else{
		ans1 = "000" + ans1;
	}

//ear?
	if(item_typeCD[itemno] == "ear"){
		earclass = "";
		earlevel = 0;
		earname = "";
		earstep = 0;
		for(jj = 0; jj < item_personal[itemno].length; jj++){
			earchr = item_personal[itemno].charAt(jj);
			if(earstep == 0){
				if(earchr == "("){
					earstep = 1;
				}
				else{
					earname += earchr;
				}
			}
			else if(earstep == 1){
				if(earchr == " "){
					earstep = 2;
				}
				else{
					earclass += earchr;
				}
			}
			else if(earstep == 2){
				if(earchr == ")"){
					earstep = 3;
				}
				else{
					earlevel = earlevel * 10 + earchr * 1;
				}
			}
		}
		switch(earclass){
		case "Amazon":
			ans1 = "000" + ans1;
			break;
		case "Sorceress":
			ans1 = "001" + ans1;
			break;
		case "Necromancer":
			ans1 = "010" + ans1;
			break;
		case "Paladin":
			ans1 = "011" + ans1;
			break;
		case "Barbarian":
			ans1 = "100" + ans1;
			break;
		case "Druid":
			ans1 = "101" + ans1;
			break;
		case "Assasin":
			ans1 = "110" + ans1;
			break;
		}
		ans1 = "00000000" + chr_hexbit(earname, 1, 7) + dec_bit(earlevel, 7) + ans1;
		zeroadd = 8 - (ans1.length % 8);
		if(zeroadd < 8) for(jj = 0; jj < zeroadd; jj++) ans1 = "0" + ans1;

		return ans1;
	}

//76 item type code (3 letters)
	ans1 = "00100000" + chr_hexbit(item_typeCD[itemno], 1, 8) + ans1;

//108 Inserted number
	if((chk == "g") && (edit_mode == 0)) ans1 = "001" + ans1; //**********************
	else ans1 = dec_bit(item_socketed[itemno], 3) + ans1;

	if((chk == "f") || (chk == "g") || (chk == "h") || (chk == "e")){
		ans1 = "0" + ans1;
		return ans1;
	}

//111 item ID
	ans1 = random_maker(4) + ans1;

//143 item level
	ans1 = dec_bit(item_lvl[itemno], 7) + ans1;

//150 item quality
	ans1 = dec_bit(item_quality[itemno], 4) + ans1;

//picture type for ring, amulet, jewel and charm
	ans1 = (((chk == "v") || (chk == "y") || (chk == "z")) ? (dec_bit(item_pictype[itemno], 3) + "1") : "0") + ans1;

//character specific items
	ans1 = ((chk == "B") || (chk == "C") || (chk == "G") || (chk == "H") || (chk == "N") || (chk == "O") || (chk == "b") || (chk == "c") ? "000000000001" : "0") + ans1;

//Normal charm
	if((chk == "y") && (item_quality[itemno] == 2)) ans1 = "000000000000" + ans1;

//low quality
	if(item_quality[itemno] == 1) ans1 = dec_bit(item_qlvl[itemno], 3) + ans1;
//sperior
	else if(item_quality[itemno] == 3) ans1 = "000" + ans1;
//magic item
	else if(item_quality[itemno] == 4) ans1 = dec_bit(item_suffix[itemno],11) + dec_bit(item_prefix[itemno],11) + ans1;
//set or unique
	else if((item_quality[itemno] == 5) || (item_quality[itemno] == 7)) ans1 = dec_bit(item_prefix[itemno],12) + ans1;
//rare or craft
	else if((item_quality[itemno] == 6) || (item_quality[itemno] == 8)) ans1 = "000000" + dec_bit(item_suffix[itemno],8) + dec_bit(item_prefix[itemno],8) + ans1;

//rune words
	ans1 = (((item_quality[itemno] != 5 && endflagNum > 1) || endflagNum > 6) ? "0000000000000000" : "") + ans1;

//Personalize
	if(item_personal[itemno] != "") ans1 = "0000000" + chr_hexbit(item_personal[itemno], 1, 7) + ans1;

//tome of tp
	ans1 = ((item_typeCD[itemno] == "ibk") ? "1" : "0") + ans1;

//defence
	if(edit_mode == 0){
		if(get_info(item_DBno[itemno],4)) ans1 = dec_bit(item_def[itemno] + 10,11) + ans1;
	}else{
		if(get_info(item_DBno[itemno],4)) ans1 = dec_bit(item_def[itemno] + 10,10) + ans1;
	}

//durability
	if(get_info(item_DBno[itemno],5)){
		ans1 = dec_bit(item_dur1[itemno],8) + ans1;
		if(item_dur1[itemno] > 0) ans1 = dec_bit(item_dur0[itemno], (edit_mode == 0 ? 9 : 8) ) + ans1;
	}

//socket 1
	if(item_socket[itemno]) ans1 = dec_bit(item_socketno1[itemno],4) + ans1;

//tome of tp and id
	if(chk == "x") ans1 = "00000" + ans1;

//quantity
	if(get_info(item_DBno[itemno], 6)) ans1 = dec_bit(item_quantity[itemno],9) + ans1;

//set item
	if(item_quality[itemno] == 5) ans1 = "000000111111".substr(endflagNum,5) + ans1;
	//这里根据511属性的数量自动设置有效属性标志。避免强制6个511属性的情况。

//magic options
	for(jj = 0; jj < mopt_no[itemno]; jj++){
		ans1 = dec_bit(mopt_cd[itemno][jj],9) + ans1;
		value_length = get_moptbit(mopt_cd[itemno][jj], 0, edit_mode);
		if(get_moptbit(mopt_cd[itemno][jj], 4, edit_mode) > 0) value_length += get_moptbit(mopt_cd[itemno][jj]+1, 0, edit_mode)
		if(get_moptbit(mopt_cd[itemno][jj], 4, edit_mode) > 1) value_length += get_moptbit(mopt_cd[itemno][jj]+2, 0, edit_mode)
		ans1 = dec_bit(mopt_value[itemno][jj], value_length) + ans1;
	}
	if (parseInt(mopt_cd[itemno][mopt_no[itemno]-1]) != 511) ans1 = "111111111" + ans1;

	return ans1;
}

//################## Random ID maker ##################
function random_maker(byteno)
{
	IDans = "";

	for(IDi = 0; IDi < byteno; IDi++){
		random_num = Math.floor(Math.random() * 256);
		IDans += dec_bit(random_num,8);
	}

	return IDans;
}

//################## Calculate Checksum ##################
function checksum(indata)
{
	chksum = 0;

	for(i = 0; i < (indata.length / 2); i++){
		chksum = chksum * 2 + parseInt(indata.substr(i * 2, 2),16);
		if(chksum > 4294967295) chksum-= 4294967295;
	}

	return chksum;
}

//################## bit checker ##################
function open_chksheet()
{
	obj = document.getElementById("check_sheet");
	obj.style.left = document.body.scrollLeft;
	obj.style.top = document.body.scrollTop;
	obj.style.visibility = "visible";
	obj.style.zIndex = 99;
}

function close_chksheet()
{
	obj = document.getElementById("check_sheet");
	obj.style.visibility = "hidden";
}

function bit_checker(nono)
{
	item_puc = item_puckage[nono*1];

	bit_value = "";
	start_bit = document.test_sheet.star.value * 1;
	bit_length = document.test_sheet.leng.value * 1;

	for(ii = start_bit; ii < (start_bit + bit_length); ii++) bit_value = item_puc.charAt(ii) + bit_value;

	if(document.test_sheet.which.checked == true){
		document.test_sheet.data2.value = bit_value;
	}
	else{
		document.test_sheet.data1.value = bit_value;
	}
}

//################## DEC -> BIT ##################
function bit_conv2(in_data)
{
	return (in_data * 1).toString(2);
}

//################## BIT -> DEC ##################
function bit_conv3(in_data)
{
	return parseInt(in_data,2);
}

//################## confirm clear ##################
function clear_all()
{
	if(confirm("您是否要清除所有的资料？")) window.location.reload();
}

//################## DAMAGE CALCULATION ##################
function gocal()
{
	str0 = document.stats_sheet.chr_str.value;
	dex0 = document.stats_sheet.chr_dex.value;
	bns0 = document.insheet.skill_bns.value;
	ehs0 = document.insheet.dmg_bns.value * 1;
	min0 = document.insheet.wep_mindam.value * 1;
	max0 = document.insheet.wep_maxdam.value * 1;
	document.insheet.str.value = str0;
	document.insheet.dex.value = dex0;
	document.insheet.bns.value = bns0;
	document.insheet.ehs.value = ehs0;
	document.insheet.mind.value = min0;
	document.insheet.maxd.value = max0;

	if( str0 == "") alert("Set Strength.");
	else if( dex0 =="") alert("Set Dexterity.");
	else if( bns0 =="") alert("Set Bonus%.");
	else if(min0 > max0) alert("Minimum damage > Maximum damage?");
	else if(max0 > (min0+200)) alert("Too much spread ( spread < 200 )");
	else calwin = window.open("./utility/dam_calc2.html","calc2");
}

//################## Attack Rating CALCULATION ##################
function arcal()
{
	dex0 = parseInt(document.stats_sheet.chr_dex.value,10);
	bns1 = parseInt(document.insheet.ar_bns1.value,10);
	bns2 = parseInt(parseInt(document.insheet.ar_bns2.value,10) * parseInt(document.stats_sheet.chr_lvl.value,10) * 0.5);
	bns0 = bns1 + bns2;

	max0 = 4294967296;	//0x100000000;
	max1 = max0 / 2;

	ar0 = (dex0 * 4 + ar_initial[document.stats_sheet.chr_class.selectedIndex * 1]) % max0;
	ar0 = (ar0 > max1) ? (ar0 - max0) : ar0;
	ar1 = (ar0 < 0) ? (max0 + ar0) : ar0;
	ar1*= bns0;
	ar1 = ar1 % max0;
	ar1 = (ar1 > max1) ? (ar1 - max0) : ar1;
	ar2 = ar0 + parseInt(ar1 / 100 * ((ar1 < 0) ? (-1) : 1)) * ((ar1 < 0) ? (-1) : 1);

	ar0 = (dex0 * 5 + ar_initial[document.stats_sheet.chr_class.selectedIndex * 1] - 7) % max0;
	ar0 = (ar0 > max1) ? (ar0 - max0) : ar0;
	ar1 = (ar0 < 0) ? (max0 + ar0) : ar0;
	ar1*= bns0;
	ar1 = ar1 % max0;
	ar1 = (ar1 > max1) ? (ar1 - max0) : ar1;
	ar3 = ar0 + parseInt(ar1 / 100 * ((ar1 < 0) ? (-1) : 1)) * ((ar1 < 0) ? (-1) : 1);

	document.getElementById("bns20").innerHTML = "";
	document.getElementById("bns20").innerHTML = bns2;
	document.getElementById("ar").innerHTML = "";
	document.getElementById("ar").innerHTML = ar2 + " (v1.09)<br>" + ar3 + " (v1.10)";
}

//################## Key press detected ##################
function key_pressed(e)
{
	if(scr_no0 != 5) return;

	var keyChar = String.fromCharCode(e.which);

	switch(keyChar){
	case "A": //create item
		item_create();
		break;
	case "S": //copy item
		item_copy();
		break;
	case "D": //delete item
		item_delete();
		break;
	case "Z": //create item
		option_up();
		break;
	case "X": //copy item
		option_down();
		break;
	case "C": //delete item
		option_delete();
		break;
	}
}

//################## Open floating help WINDOW ##################
function poph(msg)
{
	if(msg == "") return;
	if(document.etc_form2.h_winflg.checked == false) return;

	obj = document.getElementById("help_window");

	if(pop_x > 500){
		popx = pop_x - 100;
	}else{
		popx = pop_x + 20;
	}

	popy = pop_y + 10;

	obj.style.left = popx;
	obj.style.top = popy;
	obj.style.visibility = "visible";
	obj.innerHTML = msg;
}

//################## close floating help WINDOW ##################
function unpoph()
{
	document.getElementById("help_window").style.visibility = "hidden";
	document.getElementById("help_window").innerHTML = "";
}

//################## version check ##################
function verchk()
{
	chkwin = window.open("./utility/ver_check.html","verck");
}

//################## SET MOUSE EVENT ##################
if(document.layers) document.captureEvents(Event.MOUSEMOVE);

if(!document.all && document.getElementById){
	window.onmousemove = handlerMM;
	window.captureEvents(Event.MOUSEMOVE);
}
else{
	document.onmousemove = handlerMM;
}

//################## SET key EVENT ##################
if(document.layers) document.captureEvents(Event.KEYPRESS);

if(!document.all && document.getElementById){
	window.onkeypress = key_pressed;
	window.captureEvents(Event.KEYPRESS);
}else if(window.ActiveXObject){
	document.onkeypress=function(){if(event.shiftKey)key_pressed({"which":event.keyCode});};
}

//################## Item Categorize ##################
for(i = 0; i < 43; i++){
	cat_max[i] = (-1);
	cat_item[i] = new Array();
}

for(i = 0; i < 647; i++){
	catno = cat_index.indexOf(get_info(i,3));
	cat_max[catno]++;
	cat_item[catno][cat_max[catno]] = i;
}

//################## Magical Attribute Categorize ##################
for(i = 0; i < 19; i++){
	mcat_max[i] = (-1);
	mcat_attr[i] = new Array();
}

for(i = 0; i <= 511; i++){
	mcatno = mcat_index.indexOf(get_moptbit(i,3, edit_mode));
	if(mcatno > (-1)){
		mcat_max[mcatno]++;
		mcat_attr[mcatno][mcat_max[mcatno]] = i;
	}
}

//################## Lord Reminder ##################
for(i = 0; i < 20; i++){
	remindID[i] = get_remindID(i);
	remindData[i] = get_remindData(i);
}
//-->
