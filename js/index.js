var dappAddress = "n22oPG2JfJ6Xw1a1UeeoMw2sftkNLaRyqXL";
$(function() {
	
	
		var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
		var nebpay = new NebPay();

		
		//var dappAddress = "n1xfyB4ZaDAhoXnpoQ9Ta9Fmr37CYwMyoDT";
		var txHash = "06b24ad954ef6649b778925be5e955d5f3c19e2f3d97f0b48fb09cdada4c4309";
		
		
	$("#allword").click(function() {
		$("#detailTitle").text("保健!");

		var to = dappAddress;
		var value = "0";
		var callFunction = "getdabaojian";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp) {
				//console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body" >暂无记录</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if(res.length == 0){
					$("#searchresult").html('<div class="panel-body">暂无记录</div>');
					return;
				}

				var tempStr = "";

				for (var i = 0; i < res.length; i++) {
					if (i % 2 == 0) {
						tempStr += '<div class="panel-body"> ';
					} else {
						tempStr += '<div class="panel-footer">';
					}

					//					
					tempStr += '<p>';
					tempStr += res[i].content;
					tempStr += '</p>';
					tempStr += '<p>';
					tempStr += '<small><cite>' + '收录ID:' + res[i].author.substr(2,3) + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<a class="btn" href="javascript:void(0)" id="like" onclick="addMy(';
					tempStr += res[i].index;
					tempStr += ')">收藏</a>';

					tempStr += '</p> </div> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});

	});
	$("#allword").click();

	$("#Myword").click(function() {
		$("#detailTitle").text("收藏");



		var to = dappAddress;
		var value = "0";
		var callFunction = "getMy";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp) {
				//console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if(res.length == 0){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
				

				var tempStr = "";

				for (var i = 0; i < res.length; i++) {
					if (i % 2 == 0) {
						tempStr += '<div class="panel-body"> ';
					} else {
						tempStr += '<div class="panel-footer">';
					}

					//					
					tempStr += '<p>';
					tempStr += res[i].content;
					tempStr += '</p>';
					tempStr += '<p>';
					tempStr += '<small><cite>' + '收录:' + res[i].author + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<a class="btn" href="#" id="reMy" onclick="reMy(';
					tempStr += res[i].index;
					tempStr += ')">取消收藏</a>';
					
					tempStr += '</p> </div> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});

	});

	$("#create").click(function() {
		$("#detailTitle").text("记录保健信息")

		var tempStr = '';
		tempStr += '<div class="panel-body"> ';
		tempStr += '<form role="form">';
		tempStr += '<div class="form-group">';
		tempStr += '<p>请遵守当地法律法规呦~</p>';
		tempStr += '<label>地区</label>';
		tempStr += '<input type="text" placeholder="北京东城区" id="name" >';
		tempStr += '<label>价位</label>';
		tempStr += '<input type="text" placeholder="200" id="mon">';
		tempStr += '<br><label>详细内容/服务项目/体验评价:</label>';
		tempStr += '<textarea class="form-control" rows="10" id="content" >全套,技术可以,全天营业,服务不错,安全</textarea>';
		tempStr += '<br><label>发布人-联系方式:<label><input type="text" placeholder="王警官-110" id="auth" >';
		tempStr += '<label>详细位置:<label><input type="text" placeholder="请填写详细地址" id="loc" >';
		tempStr += '<button type="button" class="btn btn-primary" id="savebutton" onclick="save();">上传</button>';		
		tempStr += '</div>';
		tempStr += '</form>';
		tempStr += '</div> ';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
	});

	$("#about").click(function() {
		$("#detailTitle").text("关于")

		var tempStr = '';
		tempStr += ' <blockquote><p>星云链是致力于构建可持续升级良性生态的下一代公链。独创的区块链价值发现体系、前瞻性的激励和共识机制、避免硬分叉的自进化能力</p></blockquote><p>服务器立足于美利坚合众国,对全球人类服务,受北美法律保护。</p><p>版权所有,未经授权禁止复制或建立镜像。</p><p>本网站上的一切信息由用户提供,网站不能保证信息真实姓,没有任何盈利不承担任何风险或法律责任。</p><p>请使用者自行甄别内容</p>';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
	});


});

function addMy(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var to = dappAddress;
		var value = "0";
		var callFunction = "addMy";
		var callArgs = "[\"" + index + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function(resp) {
				console.log(JSON.stringify(resp.result));
			}
		});
};

function reMy(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var to = dappAddress;
		var value = "0";
		var callFunction = "reMy";
		var callArgs = "[\"" + index + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function(resp) {
				console.log(JSON.stringify(resp.result));
			}
		});
};

function save(){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var content = $("#content").val();
		var name = $("#name").val();
		var auth = $("#auth").val();
		var loc = $("#loc").val();
		var mon = $("#mon").val();
		if (content == "") {
			alert("请输入内容。");
			return;
		}
		if (name == "") {
			alert("请输入地区。");
			return;
		}
		if (auth == "") {
			alert("请输入联系方法。");
			return;
		}
		if (loc == "") {
			alert("请输入详细地址。");
			return;
		}
		if (mon == "") {
			alert("请输入大致价位。");
			return;
		}
		content= content.replace(/\n/g,"<br>"); 
		name= name.replace(/\n/g,"<br>"); 
		var to = dappAddress;
		var value = "0";
		var callFunction = "save";
		var callArgs = "[\"" + name + ":"+mon+"\u003cbr\u003e" + content + "\u003cbr\u003e" +auth +"地址:"+loc+"\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function Push(resp) {
				console.log("response of push: " + JSON.stringify(resp))
				var respString = JSON.stringify(resp);
				if(respString.search("rejected by user") !== -1){
					alert("关闭交易,取消上传")
				}else if(respString.search("txhash") !== -1){
					alert("上传Hash: " + resp.txhash+"请等待交易确认,如果上传失败请检查内容是否含有特殊字符")
				}
			}
		});
	

};

function ttt(timestamp) {
	var date = new Date(timestamp * 1000);//10*1000，13*0
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes();
	return Y+M+D+h+m;
}
