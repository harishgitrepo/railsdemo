// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on('turbolinks:load',function(){
	var sound_on = false;
	if (window.location.pathname.includes("howwemet")) {
		$.scrollify({
	        section : ".section_page",
	        interstitialSection : "",
	        easing: "easeOutExpo",
	        scrollSpeed: 1100,
	        offset : 0,
	        scrollbars: true,
	        standardScrollElements: "",
	        setHeights: true,
	        overflowScroll: true,
	        updateHash: true,
	        touchScroll:true,
	        before: function() {},
	        after:function() {},
	        afterResize:function() {},
	        afterRender:function() {}
	    });
    	
    	$.scrollify.enable();
		$(window).scroll(function (event) {
			if (sound_on) {
				turnOnSound();
				speakOut(responsiveVoice);
			} else {
				turnOffSound(responsiveVoice);
			}	
		});
		$('#modal1').openModal();

		$('#volume_up_button').click(function(){
			sound_on = false;
			turnOffSound(responsiveVoice);
		});

		$('#volume_down_button').click(function(){
			sound_on = true;
			turnOnSound();
			speakOut(responsiveVoice);
		});


	} else {
		$.scrollify.disable();
	}

	

});

$(window).bind('page:change', function() {
	if(responsiveVoice.isPlaying()) {
  			responsiveVoice.cancel();
		}
});


function speakOut(voice) {
	
	if(voice.isPlaying()) {
  		voice.cancel();
	}
	var hash_value = window.location.hash;
	switch(hash_value) {
		case "#1":
			voice.speak("It all started in College,we become friends special thanks to computer science lab . She was a good friend back then.","US English Male", { pitch: 0 } );
			voice.speak("Yes ! Sharing our likes and dislikes.Always making fun of each other. Preparing for exams together ( sometimes )","US English Female", { pitch: 0 } );
			break;
		case "#2":
			voice.speak("Ass the Time went by, our bond become inseparable and made each of us had a vision travelling together for a longer time.","US English Male", { pitch: 0 } );
			voice.speak("Fought through the circumstances and finally we end up on the beautiful occasion called marriage.","US English Female", { pitch: 0 } );
			break;
		case "#3":
			voice.speak("Ishhwarya, never met a girl who can impact me so much… She is very much friendly and loveable in nature.Very much Practical and also StraightForward in talking… Very best thing about her is most of her decisions are accurate and she is not selfish on it… And to be honest she is powerful and independent … And how can i forget this ! she is very beautiful  !  Time with her is priceless for me ! She is my first chance for understanding a girl’s world completely.My vision on life has changed drastically by her and she is a good motivator when i am doing something… that cheers me up ! A thankful and a beautiful welcome to you in my life !","US English Male", { pitch: 0 } );
			break;
		case "#4":
			responsiveVoice.speak("HarIsh. That is him ! Who is almost contained of me in him as equal proportion within these 3 years.If you ask me to define him. I would say Simplicity. Affectionate. Caring. Innocent at times! and a very very positive person.Sometimes you can never resist some people that they would be \"anything\" for you. Harish was one such person I met in my life for the first time.A wonder stuck fact about him is that He personifies 'hardwork' and keeps moving towards his dream no matter how much ever obstacles may come.In these 3 years, I have learnt so many important lessons of life from him and because of him. I believe he can be the only person who could tolerate all my tantrums!   Destiny has bonded us together so soon that with great aspirations and colourful dreams we are going to start our new chapter of life together with all the blessings of our parents and family.Come join us and bless us in our auspicious day of life.","US English Female", { pitch: 0 } );
			break;
		default:
	}
		
}


function turnOnSound() {
	$('#volume_down_button').hide();
	$('#volume_up_button').show();
}


function turnOffSound(voice) {
	$('#volume_up_button').hide();
	$('#volume_down_button').show();
	if(voice.isPlaying()) {
  		voice.cancel();
	}

}