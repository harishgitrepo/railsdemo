// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('turbolinks:load',function(){

	
	if (window.location.pathname.includes("photos")) {
		loadPhotos();	
	}

});

function loadPhotos() {
	var photos = ["DSC_1263.JPG","DSC_1286.JPG","DSC_1291.JPG","DSC_1292.JPG","DSC_1293.JPG","DSC_1294.JPG","DSC_1304.JPG","DSC_1328.JPG","DSC_1332.JPG","DSC_1333.JPG","DSC_1339.JPG","DSC_1340.JPG","DSC_1344.JPG","DSC_1346.JPG","DSC_1370.JPG","DSC_1371.JPG","DSC_1373.JPG","DSC_1376.JPG","DSC_1377.JPG","DSC_1378.JPG","DSC_1382.JPG","DSC_1383.JPG","DSC_1395.JPG","DSC_1404.JPG","DSC_1408.JPG","DSC_1412.JPG","DSC_1417.JPG","DSC_1422.JPG","DSC_1424.JPG","DSC_1426.JPG","DSC_1435.JPG","DSC_1462.JPG","DSC_1452.JPG"]
	var portrait_photos = ["DSC_1269.JPG","DSC_1330.JPG","DSC_1337.JPG","DSC_1277.JPG"]
	
	portrait_photos.forEach(function(entry,index){
		var classname = "";
		switch(index%3){
			case 0:
				classname = "photo_left";
				break;
			case 1:
				classname = "photo_middle";
				break;
			case 2:
				classname = "photo_right";
				break;
		}
		var wishlink = "/assets/engagement_photos/" + entry;
		var result = "<div class=\"portraitphotoscard "  + classname  + "\" style=\"float: left;\"><a href=\""+ wishlink +"\"   target=\"_blank\" ><img  class=\"portrait_photo_image " + "" +  "\" src=\"" + wishlink + "\"> </img></a></div>"	
		
		$("#photos_container").append(result);
	});
	photos.forEach(function(entry,index){
		var classname = "";
		switch(index%3){
			case 0:
				classname = "photo_left";
				break;
			case 1:
				classname = "photo_middle";
				break;
			case 2:
				classname = "photo_right";
				break;
		}
		var wishlink = "/assets/engagement_photos/" + entry;
		var result = "<div class=\"photoscard\" style=\"float: left;\"><a href=\""+ wishlink +"\"   target=\"_blank\" class=\""+ classname +"\"><img  class=\"photo_image\" src=\"" + wishlink + "\"> </img></a></div>"	
		
		$("#photos_container").append(result);
	});
	
	
}