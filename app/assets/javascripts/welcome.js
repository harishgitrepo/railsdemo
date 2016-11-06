// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function dayDiff(first, second) {
          return (second-first)/(1000*60*60*24);
}
function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 12.5316439, lng: 78.2069398},
      zoom: 13
  });
  var marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: {lat: 12.5316439, lng: 78.2069398},
    label: "S",
    title: "SVV Thirumana Mandabam"
  });
   var contentString = 
      
      
      "<p><b>SVV Thirumana Mandabam</b></br>" +
      "Opposite to  New Bus Stand</br>"+
      "Krishnagiri - 635001</p>" +
      "<a target="+ "'_blank'" + "href='https://www.google.co.in/maps/place/SVV+Thirumana+Mandapam/@12.5316439,78.2069398,15z/data=!4m5!3m4!1s0x0:0x2150e84b41e8dc0e!8m2!3d12.5316439!4d78.2069398'>View on Google Site</a>";

      
 var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
 infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

var cal = "";
$(document).on('turbolinks:load',function() {
	
    // ICS Code
    cal = ics();
    cal.addEvent('Harish Weds Ishwarya', 'Warm Welcome to you on our marriage occasion !!', 'SVV Thirumana Mandabam, Opp. to New Bus Stand, Krishnagiri', '02/05/2017', '02/06/2017');
    

    // FLIPCLOCK Code
	  var clock;
      var currentDate = new Date();
      var marriageDate = new Date(2017,1,6,9);
      var diff = marriageDate.getTime() / 1000 - currentDate.getTime() / 1000;

      if (dayDiff(currentDate, marriageDate) < 100) {
					$('.clock').addClass('twoDayDigits');
				} else {
					$('.clock').addClass('threeDayDigits');
				}

			clock = $('.clock').FlipClock(diff, {
		        clockFace: 'DailyCounter',
		        autoStart: false,
            	countdown: true,
		        callbacks: {
		        	stop: function() {
		        		$('.message').html('The clock has stopped!')
		        	}
		        }
		    });

		    $('#start').click(function(e){
        		e.preventDefault();
        		// clock.start();
        		// $(this).attr('id', 'stop');
        		// $('#stop').html('Stop');
    	});
        
		clock.start();
		clock.setOptions('onclick',null);
		$('.clock').prop('onclick',null).off('click');


    $('.ics_button').click(function(){
      cal.download("HarishWedsIshwarya");
    });

      $('.arrow').click(function() {
    $("html, body").animate({ scrollTop: 700 }, 1000);
  });

    var divs = $('.arrow');
    $(window).scroll(function(){
    if($(window).scrollTop() <20 ){
         divs.stop(true,true).fadeIn("fast");
    } else {
         divs.stop(true,true).fadeOut("fast");
    }
    });



});