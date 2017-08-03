



I.get('updateInfo',function(data,sender,sendResponse){
	$.ajax({
		url:'http://localhost:3002/task/updateInfo',
		method:'get',
		data:data,
		success:function(data){
			console.log(data);
		}
	});
})

I.get('getInfo',function(data,sender,sendResponse){
	$.ajax({
		url:'http://localhost:3002/task/getInfo',
		data:data,
		success:function(data){
			sendResponse(data);
		}
	});	
})

I.get('setWebsite',function(data,sender,sendResponse){
	localStorage.setItem('website',data.website);
})

I.get('getWebsite',function(data,sender,sendResponse){
	sendResponse(localStorage.getItem('website'));
})