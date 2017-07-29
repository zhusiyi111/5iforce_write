

// 加载insert.js
var s = document.createElement('script');
s.src = chrome.extension.getURL('js/clickAds/insert.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);







var lastImg = '';

var successTimer = setInterval(function(){

	var isSuccess = (function(){
		if($('#urlcheck').hasClass('success') && !$('#urlcheck').is(':hidden')){
			return true;
		}else{
			return false;
		}
	})();



	var img = $('.yaoqiu').find('img').eq(0).attr('src');

	if( isSuccess && lastImg !== img ){
		uploadInfo();
		lastImg = img;
	}	

},100)




// 是否已经请求了
var lasttImg = '';
var timer = setInterval(function(){
	var isOpened = (function(){
		if( !$('#newadurl').is(':hidden') && $('#newadurl').length!==0){
			return true;
		}else{
			return false;
		}
	})()

	var img = $('.yaoqiu').find('img').eq(0).attr('src');
	if(isOpened && img!==lasttImg){
		fillAnswer();
		lasttImg = img;
	}
},200);




function uploadInfo(){

	var need = $('.yaoqiu').text().replace(/\s/g,''),
		imgs = $('.yaoqiu img') || '',
		lastRequest = $('.lastrequest').text().replace(/\s/g,''),
		imgStr = [],
		adUrl = $('#newadurl').val() || '',
		adText = $('#cktext').val() || '';

	imgs.each(function(){
		imgStr.push($(this).attr('src'));
	})
	imgStr = imgStr.join('');

	I.ajax({
		method:'getWebsite',
		success:function(data){

			var website = data;

			I.ajax({
				method:'updateInfo',
				data:{
					need:need,
					imgStr:imgStr,
					lastRequest:lastRequest,
					adUrl:adUrl,
					adText:adText,
					website:website
				},
				success:function(data){
					console.log(data);
				}
			})
		}
	})

}

$(document).delegate('#ui-id-4','click',function(){
	uploadInfo();
})




// 点过的变绿
$(document).delegate('.zhuanclick','click',function(){
	$(this).find('.title').css('color','green');
})



function fillAnswer(){

	var need = $('.yaoqiu').text().replace(/\s/g,''),
		imgs = $('.yaoqiu img') || '',
		lastRequest = $('.lastrequest').text().replace(/\s/g,''),
		imgStr = [];

	imgs.each(function(){
		imgStr.push($(this).attr('src'));
	})
	imgStr = imgStr.join('');



	I.ajax({
		method:'getInfo',
		data:{
			need:need,
			imgStr:imgStr,
			lastRequest:lastRequest
		},
		success:function(data){
			data = JSON.parse(data)[0];
			if(data){
				if(data.adUrl){
					$('#newadurl').val(data.adUrl);
				}
				if(data.adText){
					$('#cktext').val(data.adText)
				}
			}
			
		}
	})

	

}

$(document).delegate('.working_3','click',function(){
	fillAnswer();
})



function setNowTask(data){
	// localStorage只能存字符串
	data = JSON.stringify(data);
	chrome.runtime.sendMessage({
		J_method:'setNowTask',
		data:data
	}, function(res) {

	});
}

