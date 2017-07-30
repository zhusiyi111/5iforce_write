





$(function(){
	var website = location.href;
	if(!/www\.5iads\.cn/.test(website)){
		I.ajax({
			method:'setWebsite',
			data:{
				website:location.href
			},
			success:function(data){

			}
		})
	}
	
})