(function($) {

 function init() {
    /* Sidebar height set */
    $sidebarStyles = $('.sidebar').attr('style')
    $sidebarStyles += ' min-height: ' + $(document).height() + 'px;';
    $('.sidebar').attr('style', $sidebarStyles);

    /* Secondary contact links */
    var $scontacts = $('#contact-list-secondary');
    var $contactList = $('#contact-list');

    $scontacts.hide();
    $contactList.mouseenter(function(){ $scontacts.fadeIn(); });
    $contactList.mouseleave(function(){ $scontacts.fadeOut(); });

    /**
     * Tags & categories tab activation based on hash value. If hash is undefined then first tab is activated.
     */
    function activateTab() {
      if(['/tags.html', '/categories.html'].indexOf(window.location.pathname) > -1) {
        var hash = window.location.hash;
        if(hash)
          $('.tab-pane').length && $('a[href="' + hash + '"]').tab('show');
        else
          $('.tab-pane').length && $($('.cat-tag-menu li a')[0]).tab('show');
      }
    }
    /**
     * 
     * */
    function particlesFunc(){
    	/* default dom id (particles-js) */
    	//particlesJS();

    	/* config dom id */
    	//particlesJS('dom-id');

    	/* config dom id (optional) + config particles params */
    	particlesJS('particles-js', {
    	  particles: {
    	    color: '#fff',
    	    shape: 'circle', // "circle", "edge" or "triangle"
    	    opacity: 1,
    	    size: 4,
    	    size_random: true,
    	    nb: 150,
    	    line_linked: {
    	      enable_auto: true,
    	      distance: 100,
    	      color: '#fff',
    	      opacity: 1,
    	      width: 1,
    	      condensed_mode: {
    	        enable: false,
    	        rotateX: 600,
    	        rotateY: 600
    	      }
    	    },
    	    anim: {
    	      enable: true,
    	      speed: 1
    	    }
    	  },
    	  interactivity: {
    	    enable: true,
    	    mouse: {
    	      distance: 300
    	    },
    	    detect_on: 'canvas', // "canvas" or "window"
    	    mode: 'grab',
    	    line_linked: {
    	      opacity: .5
    	    },
    	    events: {
    	      onclick: {
    	        enable: true,
    	        mode: 'push', // "push" or "remove"
    	        nb: 4
    	      }
    	    }
    	  },
    	  /* Retina Display Support */
    	  retina_detect: true
    	});
    }
    // watch hash change and activate relevant tab
    $(window).on('hashchange', activateTab);

    // initial activation
    activateTab();
    particlesFunc();
  };

  // run init on document ready
  $(document).ready(init);

})(jQuery);