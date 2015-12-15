(function() {
'use strict';

//Cache variables for use throughout the module.

var $cards,
  $cardsContainer;
  
  
function initialize() {
  var mapOptions = {
     center: { lat: 36.107169, lng: -112.113115},
     zoom: 10,
     disableDefaultUI: true
  };
  var draggable = document.getElementById('map-canvas').getAttribute("data-draggable");
  if(draggable == "false") {
     mapOptions.disableDefaultUI = true;
     mapOptions.draggable = false;
     mapOptions.zoomControl = false;
     mapOptions.scrollwheel = false;
     mapOptions.disableDoubleClickZoom = true;
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
     mapOptions);
     var grandCanyonLatLong = new google.maps.LatLng(36.107169, -112.113115);
     var grandCanyon = new CustomMarker(grandCanyonLatLong, map, 1, "" );
     var northRimLatLong = new google.maps.LatLng(36.2105, -112.0613);
     var northRim = new CustomMarker(northRimLatLong, map, 99, "active" );
     var kiababPlateauLatLong = new google.maps.LatLng(36.396216, -112.150598);
     var kiababPlateau = new CustomMarker(kiababPlateauLatLong, map, 100, "" );
}

$(document).ready(function() {
    
    google.maps.event.addDomListener(window, 'load', initialize);
    
    $cardsContainer = $('.js-bottom');
    $cards = $cardsContainer.find('.card');
    $cards.first().addClass('active');
});


$('.js-bottom').swipeleft(function() {
  slide('next');
})
.swiperight(function() {
  slide('prev');
});

//Adapted from bootstrap's carousel. 
function slide(type) {
  var $active = $cards.siblings('.active'),
    $next = findNextItem(type, $active),
    direction = type == 'next' ? 'left' : 'right';
  
  $next.addClass(type);
  $next[0].offsetWidth 
  $active.addClass(direction);
  $next.addClass(direction);
  
  setTimeout(function() { $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))}, 500);
  
}

function findNextItem(type, $activeItem) {
    var activeIndex = $cards.index($activeItem),
      delta = type == 'prev' ? -1 : 1,
      itemIndex = (activeIndex + delta) % $cards.length;
    return $cards.eq(itemIndex);
}
})();
