// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.



$(document).on('turbolinks:load',function(){

	$('.modal-trigger').leanModal({
		dismissible: true
	});
	$("#textarea1").emojioneArea();

	if (window.location.pathname.includes("wishes/index")) {
		loadWishContainer(1,false,"");	
	}
	

	$('#search').on('input',function(){
		reloadWishes(1,true,$(this).val());
	});
});


function loadWishContainer(page,isquery,queryparam) {
  		
   			 // do stuff
   			var host = window.location.host;
   			var pagetohit = "";
   			if(isquery) {
   				pagetohit = "/wishes/query?page=" + page + "&query=" + queryparam + "&format=json"
   			} else {
   				pagetohit = '/wishes/list?page=' + page + '&format=json'
   			}
   			var urltohit = 'http://' + host + pagetohit;
   			$.ajax({
   				url: urltohit,
   				success: function (e) {
   					var result = getCardsHtml(e["wishes"],isquery);
   					result += getPaginationHtml(e["totalpages"],e["currentpage"],isquery,queryparam);
   					$('.spinner-object').hide();
   					var wishescontainer = $('.wishes-container');
   					wishescontainer.empty();
   					wishescontainer.append(result);
   					wishescontainer.show();
   						
   				},
   				error: function (e) {
     				alert('error ' + e.message);
   				},
   				dataType : 'json',
   				type: 'GET',
   				//Options to tell jQuery not to process data or worry about content-type.
   				cache: false,
				contentType: "application/json",
				processData: false
   			});
 		
	}

function getCardsHtml(wishes,isquery) {
	
	if (wishes.length == 0) {
		if (isquery) {
			return "<h1>No Search Results !!</h1>"
		} else {
			return "<h1>You are the first one to wish !! Click on Add Button.</h1>"
		}
	}
	var prepond = "";
	var result = "<div class=\"row\">";
	var counttothree = 1;
	for(var i=0;i<wishes.length;i++,counttothree++) {
		wishlink = "";
		if(wishes[i]["link"]) {
			wishlink = wishes[i]["link"];
			requestForImage(wishlink);
			wishlink = wishlink.slice(1,wishlink.length);
			result += "<div class=\"col s4 \"><div class=\"card z-depth-2\"><div class=\"card-image waves-effect waves-block waves-light\"><img id=\"" + wishlink + "\"class=\"activator\" src=\"\" height=\"200\" width=\"200\"></div><div class=\"card-content\"><span class=\"card-title activator grey-text text-darken-4\"><strong>" + wishes[i].name +"</strong></span></div><div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\"><strong>" + wishes[i].name + "</strong><i class=\"material-icons right\">close</i></span><p>" + wishes[i].message + "</p></div></div></div>";
		} else {
			result += "<div class=\"col s4 \"><div class=\"messagecard card z-depth-2\"><div class=\"card-content\"><span class=\"card-title\"><strong>" + wishes[i].name + "</strong></span></br></br><p>" + wishes[i].message + "</p></div></div></div>";
		}
		if (i == wishes.length-1) {
			result += "</div>"
			break;
		}
		if(counttothree == 3) {
			result += "</div>"
			result += "<div class=\"row\">";
			counttothree = 0;
		}
	}
	console.log(result);
	return result;
}

function getPaginationHtml(totalpages,currentpage,isquery,queryparam) {
	if (totalpages == 0) {
		return "";
	}
	queryparam = "'" + queryparam + "'";
	var result = "<div class=\"paginationdiv\" align=\"center\"><ul class=\"pagination\">";
	if (currentpage == 1) {

		result += "<li class=\"disabled\"><a href=\"javascript:void(0);\" ><i class=\"material-icons\">chevron_left</i></a></li>";
	} else {
		previouspage = parseInt(currentpage)-1 ;
		result += "<li class=\"waves-effect\"><a href=\"javascript:void(0);\" onclick=\"reloadWishes(" + previouspage + "," + isquery + "," + queryparam + ")\"><i class=\"material-icons\">chevron_left</i></a></li>";
	}
	for (var i=0;i<totalpages;i++) {
		if (i == currentpage-1) {
			    result += "<li class=\"active\"><a href=\"javascript:void(0);\"> " + (i+1) + "</a></li>";
			    continue;
		}
		result += "<li class=\"waves-effect\"><a href=\"javascript:void(0);\" onclick=\"reloadWishes(" + (i+1) + "," + isquery + "," + queryparam  +")\"> " + (i+1) + "</a></li>";
	}
	if (currentpage == totalpages) {
		result += "<li class=\"disabled\"><a href=\"javascript:void(0);\" ><i class=\"material-icons\">chevron_right</i></a></li>";
	} else {
		nextpage = parseInt(currentpage) + 1;
		result += "<li class=\"waves-effect\"><a href=\"javascript:void(0);\" onclick=\"reloadWishes(" + nextpage + "," + isquery + "," + queryparam + ")\"><i class=\"material-icons\">chevron_right</i></a></li>";
	}
	result += "</ul></div>";
	return result;
}

function reloadWishes(page,isquery,queryparam) {

	$('.wishes-container').hide();
	$('.spinner-object').show();
	loadWishContainer(page,isquery,queryparam);

}

function uploadFile() {
	
	var el = $("#textarea1").emojioneArea();
	var content = el[0].emojioneArea.getText();
	if ($('#first_name').val() == "") {
		  Materialize.toast('Name is Mandatory', 1000) // 4000 is the duration of the toast
		  return false;
	}
	else if ( content == "" ) {	
		Materialize.toast('Content is Mandatory', 1000) // 4000 is the duration of the toast
		return false;
	} else {
		
		if ($('#inputfile')[0].files.length > 0) {
			if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
  				Materialize.toast('The File APIs are not fully supported in this browser.',1000);
  				
			} 
			else if ($('#inputfile')[0].files[0].size > 1048576) {
				Materialize.toast('Please upload file less than 1 MB',1000);
			} else {
				$('#uploadbutton').hide(1000);
				$('.modal-footer').append("<div class=\"progress\"><div class=\"indeterminate\"></div></div>");
				var uploadedfilepath = "";
				var file = $('#inputfile').get(0).files[0];
				var reader = new FileReader();
				reader.readAsArrayBuffer(file);

				reader.onload = function(){
					setTimeout(function(){},1000);
      				var arrayBuffer = reader.result;
      				var bytes = new Uint8Array(arrayBuffer);
      				var options = "{\"path\":\"/" +  file.name   + "\"}"
						var token = "TgXgp6atY-AAAAAAAAAAB6mr2OM72pPKJk-dyRIPvv7_PPRsM_NyuTrplRJhsPJM";
						setTimeout(function(){},1000);
						$.ajax({
			    			url: 'https://content.dropboxapi.com/2/files/upload',
			    			//Ajax events
			       			beforeSend: function (e) {
			         			
			       			},
			       			success: function (e) {
			       				
			       				uploadedfilepath = e['path_display'];
			       			var jsondata = {
			       				"name" : $('#first_name').val(),
			       				"message" : content,
			       				"link" : uploadedfilepath
			       			};
			       			var hostname = window.location.host;
			       			setTimeout(function(){},1000);
			       			$.ajax({
			    				url: 'http://' + hostname +'/wishes/create',
			    				//Ajax events
			       				beforeSend: function (e) {
			         				
			       				},
			       				success: function (e) {
			       					//$(this).prop( "disabled", false );
			       					$('#uploadbutton').show(1000);
									$('.progress').remove();
			       					$('#modal1').closeModal();
			       					reloadWishes(1,false,"");
			       				},
			       				error: function (e) {
			         				alert('error ' + e.message);
			       				},
			        			
			       				// Form data
			       				data: JSON.stringify(jsondata),

			       				type: 'POST',
			       				//Options to tell jQuery not to process data or worry about content-type.
			       				cache: false,
			       				contentType: "application/json",
			       				processData: false
			    			});
			       		},
			       		error: function (e) {
			       			
			       			console.log(e);
			         		
			         		//$(this).prop( "disabled", false );
			       		},
			        	headers: {
							'Authorization': 'Bearer ' + token,
							"Dropbox-API-Arg" : options
						},
			       		// Form data
			       		data: bytes,
			       		type: 'POST',
			       		//Options to tell jQuery not to process data or worry about content-type.
			       		cache: false,
			       		contentType: "application/octet-stream",
			       		contentLength: file.size,
			       		processData: false
			    	});

  				}
					
			} 
		} else {
			var jsonparams = {
		       	"name" : $('#first_name').val(),
		       	"message" : content
			};
			var hostname = window.location.host;
			setTimeout(function(){},1000);
			$.ajax({
				url: 'http://' + hostname +'/wishes/create',
				//Ajax events
   				beforeSend: function (e) {
     				
   				},
   				success: function (e) {
   					$('#uploadbutton').show(1000);
					$('.progress').remove();
   					$('#modal1').closeModal();
   					reloadWishes(1,false,"");
   				},
   				error: function (e) {
     				alert('error ' + e.message);
   				},
    			
   				// Form data
   				data: JSON.stringify(jsonparams),

   				type: 'POST',
   				//Options to tell jQuery not to process data or worry about content-type.
   				cache: false,
   				contentType: "application/json",
   				processData: false
			});
		}	
	}
	return false;
}

function requestForImage(image_link) {
	var token = "TgXgp6atY-AAAAAAAAAAB6mr2OM72pPKJk-dyRIPvv7_PPRsM_NyuTrplRJhsPJM";

	var xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	    	image_id = image_link.slice(1,image_link.length);
	        var imageUrl = (window.URL || window.webkitURL).createObjectURL(xhr.response);

	        // display, assuming <img id="image"> somewhere
	        document.getElementById(image_id).src = imageUrl;

	        // download via the download attribute: limited browser support
	        var a = document.createElement('a');
        	a.download = image_id;
        	a.href = imageUrl;
        	//a.click();
        	a.remove();
	    }
	};
	xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({ path: image_link }));
	xhr.send();
}

