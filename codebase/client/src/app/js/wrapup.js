var owl = $('.owl-carousel');
owl.owlCarousel({
    loop:false,
    nav:true,
    margin:10,
    dots: false,
    responsive:{
        0:{
            items:1
        }
    }
});
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});
