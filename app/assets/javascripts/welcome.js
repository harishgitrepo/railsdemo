// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


function dayDiff(first, second) {
          return (second-first)/(1000*60*60*24);
}
function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 12.5316439, lng: 78.2069398},
      zoom: 8
  });
}

$(document).ready(function() {
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
});