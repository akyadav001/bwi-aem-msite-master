var screenShifted = false;
var scrollDistance;
     
var iOS = false,
    iDevice = ['iPad', 'iPhone', 'iPod'];
  var selector = $('[data-active]');
  selector.each(function() {

    var trigger = $(this).data('target'),
        active = $(this).data('active');

    $(trigger).on('show.bs.collapse', function() {
      $(active).addClass('active');
    }).on('hide.bs.collapse', function() {
      $(active).removeClass('active');
    })
  });

//The below code scans the dom for the 'data-linked' attribute. The useage for this is to propagate the radio/checkbox 'checked'
//state to a control specified in the data attribute.
$('[data-linked]').on('change', function(e) {
  var linkedElement = $(this).data('linked');
  $(linkedElement).prop('checked', $(this).prop('checked'));
});

//For ReviewOrderEmail.html.
//TODO: Stratigize on how to generalize this for use with any radio accordion.
$('input[name="shipType"]').change(function() {
  $(this).val() == "other" ?  $('#otherDetails').collapse('show') :
      $('#otherDetails').collapse('hide');
});



//The below code listens for changes in the viewport and will reposition the popovers to proper positions below the triggering element.
//If the user falls into the mobile range after a resize/orientation shift, close the popover per design.
var timeout = setInterval(function() {
    /* If the page was scrolled, handle the scroll */
   if (screenShifted) {
      screenShifted = false;
      if (window.matchMedia("screen and (min-width: 768px)").matches) {
         $(".popover.in").each(function() { $(this).popoverX('refreshPosition'); });
      }
      else {
         $(".popover.in").each(function() { $(this).popoverX('hide') })
      }
   }
}, 100);


//IE 10 specific code. Fix for IE 10 mobile viewport issue and prompt the user
//to select a modern browser.
(function() {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        promptUserForBrowser();
    }
    for (var i=0; i < iDevice.length; i++ ) {
    if( navigator.platform === iDevice[i] ){ iOS = true; break; }
}
})();

//To resolve the issue that occurs in mobile browsers where the content will scroll regardless of the overflow being hidden, we 
//add position fixed to prevent scrolling. After this we must offset the top equal to the scroll position of where the user was before the position change.
//Once the modal/nav menu is closed, we remove the fixed position and scroll the user back to where they left off prior to interacting with the modal/nav menu. 
$('body').on('show.bs.modal bw.menu.open', function () {
  var $body = $(this);
  scrollDistance = $body.scrollTop();
  $body.css('position', 'fixed').css('top', -scrollDistance);
}).on('hide.bs.modal bw.menu.close', function() {
  $(this).css('position', '').css('top', '').scrollTop(scrollDistance);
});

//This function is used to populate the warning prompt with the desired message.
//There is an optional function that can be bound to the modal dismiss button click event. 
function showWarningModalPrompt(message, action) {
  var $modal = $('.js-warning-modal');
  $('.js-warning-modal-text').html(message);
  
  if (typeof action === 'function') {
    $('.js-warning-button').on("click", action);
  }
  $modal.modal('show');
}

//This function will check if the user has viewed the prompt to suggest using
//a modern supported browser. If they have not, the prompt is displayed and a cookie set once the user taps continue.
function promptUserForBrowser() {
  if (!Cookies.get('viewedIEPrompt')) {
    showWarningModalPrompt("This site has been optimized for use in Google Chrome, Mozilla Firefox, and Safari."
      + " For the best browsing experience, we recommend the use of one of the listed browsers.", function() {
      Cookies.set('viewedIEPrompt', 'true', {expires: 365 * 20});
    });
  }
}


