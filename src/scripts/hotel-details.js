(function() {
'use strict';

function initialize() {
  var map1 = document.getElementById('map-canvas');
  var mapOptions1 = {
    center: {lat: 39.929996, lng: -82.792249},
    zoom: 16
  }
  mapOptions1 = draggableMapOptions(map1, mapOptions1);

  var map2 = document.getElementById('attractions-map-canvas');
  var mapOptions2 = {
    center: {lat: 39.933, lng: -82.787},
    zoom: 14
  }
  mapOptions2 = draggableMapOptions(map2, mapOptions2);

  // var draggable = document.getElementById('map-canvas').getAttribute("data-draggable");
  // if(draggable == "false") {
  //    mapOptions.disableDefaultUI = true;
  //    mapOptions.draggable = false;
  //    mapOptions.zoomControl = false;
  //    mapOptions.scrollwheel = false;
  //    mapOptions.disableDoubleClickZoom = true;
  // }

    var googleMap1 = new google.maps.Map(map1,mapOptions1);
    var BWColumbusEastLatLong = new google.maps.LatLng(39.929996, -82.792249);
    var BWColumbusEast = new CustomMarker(BWColumbusEastLatLong, googleMap1, 0, "" );

    var googleMap2 = new google.maps.Map(map2,mapOptions2);
    var homeLatLong = new google.maps.LatLng(39.929, -82.792);
    var home = new CustomMarker(homeLatLong, googleMap2, 0, "" );
    var poi1LatLong = new google.maps.LatLng(39.927, -82.784);
    var poi1 = new CustomMarker(poi1LatLong, googleMap2, 1, "active" );
    var poi2LatLong = new google.maps.LatLng(39.934, -82.782);
    var poi2 = new CustomMarker(poi2LatLong, googleMap2, 2, "" );
    var poi3LatLong = new google.maps.LatLng(39.938, -82.785);
    var poi3 = new CustomMarker(poi3LatLong, googleMap2, 3, "" );
    var poi4LatLong = new google.maps.LatLng(39.936, -82.784);
    var poi4 = new CustomMarker(poi4LatLong, googleMap2, 4, "" );
}

$(document).ready(function() {
  var $amenities = $('.js-amenities'),
      $amenitiesCarousel = $('.js-amenities-carousel'),
      $amenitiesCollapseContainer = $('.js-amenities-collapse-container'),
      $amenitiesExpand = $('.js-amenities-expand'),
      $amenitiesCollapse = $('.js-amenities-collapse'),
      $amenitiesScrollBar = $('.js-amenity-scrollbar'),
      $roomCarousel = $('#room-carousel'),
      $amenityHeaderLeft = $('.js-amenity-header--left'),
      $amenityHeaderRight = $('.js-amenity-header--right');
	// try {
	// 	var firstItemSrc = $(".virtual-tour-list-item:eq(0)").attr("data-frame-src");
	// 	$("#virtual-tour-frame iframe").attr("src", firstItemSrc);
	// } catch (e) {
	// 	console.log(e);
	// }

  function pageCarouselBack() {
    $amenitiesCarousel.carousel('prev');
    $amenitiesScrollBar.removeClass("scroll-right");
  }
  
  function pageCarouselForward() {
    $amenitiesCarousel.carousel('next');
    $amenitiesScrollBar.addClass("scroll-right");
  }
  
   google.maps.event.addDomListener(window, 'load', initialize);

  $roomCarousel.swiperight(function() {
    $roomCarousel.carousel('prev');
  })
  .swipeleft(function() {
    $roomCarousel.carousel('next');
  });

  $("#virtual-tour .transparent").swiperight(function() {
    $("#room-carousel-background").carousel('prev');
  })
  .swipeleft(function() {
    $("#room-carousel-background").carousel('next');
  });

  $(".virtual-tour-list-item").click(function() {
    var src = $(this).attr("data-frame-src");
    $("#virtual-tour-frame iframe").attr("src", src);
  });

  $("#details-collapse-toggle").click(function() {
    $("#hotel-details").toggleClass("collapsed");
    if($("#hotel-details").hasClass("collapsed")) {
      $('html, body').animate({
        scrollTop: $("#hotel-details").offset().top
      }, 500);
    }
    $("#hotel-details .gradient").toggleClass("hidden");
    $("#details-toggle-expand").toggleClass("hidden");
    $("#details-toggle-collapse").toggleClass("hidden");
  });

  $amenitiesCollapseContainer.click(function() {
    $amenities.toggleClass("collapsed");
    if($amenities.hasClass("collapsed")) {
      $('html, body').animate({
        scrollTop: $amenities.offset().top
      }, 500);
    }
    $amenities.find('.gradient').toggleClass("hidden");
    $amenitiesExpand.toggleClass("hidden");
    $amenitiesCollapse.toggleClass("hidden");
  });

  $amenitiesCarousel.swiperight(pageCarouselBack)
    .swipeleft(pageCarouselForward);
  
  $amenityHeaderLeft.click(pageCarouselBack);
  $amenityHeaderRight.click(pageCarouselForward);
  
  $(".js-category-list li").click(function() {
    $(".js-category-list").addClass("attractions-category-list--hidden");
    $(".js-attractions-list").removeClass("invisible");
  });
  
  $('.js-open-categories').click(function() {
    $(".js-attractions-list").addClass("invisible");
    $(".js-category-list").removeClass("attractions-category-list--hidden");
  });
});

$('.js-attractions-list').on('swiperight', function() {
  $(this).carousel('prev');
}).on('swipeleft', function() {
  $(this).carousel('next');
});

})();
