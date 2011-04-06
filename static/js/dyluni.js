/**
*	Custom Javascript functions
*
*/

$(function($){
	
	// Hide the address bar on iPhone
	if (navigator.userAgent.match(/iPhone/i)){
		setTimeout(function(){
			window.scrollTo(0, 1);
		}, 100);
	}

	
	//Prevent iPhone and iPad to autoscale the page when rotated (http://adactio.com/journal/4470/)
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	  var viewportmeta = document.querySelector('meta[name="viewport"]');
	  if (viewportmeta) {
	    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
	    document.body.addEventListener('gesturestart', function() {
	      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
	    }, false);
	  }
	}
	
	// Make a new grid overlay. See js/jquery.hashgrid.js for additional options
	var grid = new hashgrid({
		numberOfGrids: 3
	});
	
	// Set up smooth scrolling to text anchors
	$("a").smoothScroll();
	
	// For the iPhone 4
	if(window.devicePixelRatio >= 2) {
		// Replace low-res images with high-res ones for the iPhone 4. See code below. Be sure to rename
		// your images according to Apple's guidelines ("image.png" becomes "image@2x.png")
		
		// You can also use Troy's jQuery plugin for the whole site: http://troymcilvena.com/post/998277515/jquery-retina
		
		//$retina_img.attr("src", old_src.replace(/(.+)(\.\w{3,4})$/, "$1"+ "@2x" +"$2"));
	}	

});


// Utils

var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();