<!--
	
var refreshTime = new Date();
var refreshFirst = true;
function validate(){
    var r=false;
	var vldurl = "/elective2008/edu/pku/stu/elective/controller/supplement/validate.do";
	var validCode = $("#validCode");
	if(validCode.val()==''){
		alert("验证码不正确，请重新填写。");
		return false;
	};
	$.ajax({
		url: vldurl,
		type:"post",
		data:"validCode="+validCode.val(),
		dataType:"json",
		async:false,
		success:function(data){
	    	var validInt = data.valid; 
	   		if(validInt == 2) r = true;
	   		else if(validInt == 1) alert("请先填写验证码。");
	   		else{
	   			alert("验证码不正确，请重新填写。");
	   			validCode.val("");
	   		}
    	},
    	error:function(){
    		alert("验证码不正确，请刷新页面。");
    	}
	});
	return r;
}


function confirmSelect(stuName,courseName,classNo,onlySupp,index,seqNo,freshFlag,limitedNbr) {
   if(freshFlag){
   		var refreshUrl2 = "return confirmSelect('"+stuName+"','"+courseName+"','"+classNo+"',"+onlySupp+",'"+index+"','"+seqNo+"',false,'"+limitedNbr+"');";
   		refreshLimit(stuName,courseName,classNo,onlySupp,index,seqNo,limitedNbr,refreshUrl2);
   		return false;
   }else{
		if(validate()==false) return false;
		if(onlySupp) {
			var returnMsg = window.confirm("目前只能补选课程，不能退课，您确定要继续此次操作吗？");
			if (returnMsg == false)
				return false;
		}
		var no ="";
		if(classNo !="")
			no="班号:" + classNo;	
		return true;
		var msg = stuName + "同学,您确定要选《" + courseName + "》这门课程吗？" + no + "\n" ;
		var returnValue = window.confirm(msg);
		if (returnValue == false) {
			return false;
		}
		return true;
	}
}

function confirmConcel(stuName,message) {
	var msg = stuName + "同学,你确定要退《" + message + "》这门课程吗？";
	var returnValue = window.confirm(msg);
	if (returnValue == false) {
		return false;
	}
	return true;
}

//以下是刷新选课人数部分

function refreshLimit(stuName, courseName,classNo,onlySupp,index,seqNo,limitedNbr,refreshUrl2) {
	var now = new Date();
	clearMsg(); // 清除提示信息
	if(!refreshFirst){
		dif = now.getTime()-refreshTime.getTime();
		if(dif /1000 < 5){
			alert("对不起，您需要5秒之后才可以刷新。");
			return;
		}
	}
	var limitedNum = parseInt(limitedNbr);
    $.ajax({
		url: "/elective2008/edu/pku/stu/elective/controller/supplement/refreshLimit.do",
		type:"post",
		data:"index=" + index+"&seq="+seqNo,
		dataType:"json",
		async:false,
		success:function(data){
	    	var newNum = data.electedNum; 
			if( parseInt(newNum) < limitedNum) {
				document.getElementById("electedNum" + index + index).innerHTML = limitedNum + " / " + newNum;
                var validCodeImg = document.getElementById("validCodeImg");
// 				validCodeImg.innerHTML = "<img id='imgname' border=0  src='/elective2008/DrawServlet?Rand="+Math.random()*10000+"'/>";
				var aTag = $("#refreshLimit" + index + index);
				aTag.html( "<span>补选</span>");
				aTag.removeAttr("onclick");
				aTag.attr("onclick", refreshUrl2);
				window.flag=true;
				setTimeout(() => {document.querySelector("#refreshLimit" + index + index).click();}, 1000);
			}else{
				// alert("选课人数没有变化！");
				console.log("选课人数没有变化！");
			}
			refreshTime = new Date();
    	},
    	error:function(){
    		// alert("刷新失败，请刷新页面。");
    		console.log("刷新失败，请刷新页面。");
    	}
	});
}


function clearMsg() { // 清除提示信息
	var t = document.getElementById("msgTips");
	if(t != null) {
		t.innerHTML = "";
	}
}

function changeValid(){
	var validCodeImg = document.getElementById("validCodeImg");
	validCodeImg.innerHTML = "<img id='imgname' border=0  src='/elective2008/DrawServlet?Rand="+Math.random()*10000+"'/>";
}

-->

