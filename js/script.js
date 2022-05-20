$(document).ready(function() {
  $(document).on('click', '.js-scroll-down', function() {
    $('html, body').animate({
      scrollTop: $('.gardens').offset().top - 150
    }, 500);
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $('.button__top').addClass('show');
    } else {
      $('.button__top').removeClass('show');
    }
  });

  $(document).on('click', '.js-scroll-top', function() {
    $('html, body').animate({
      scrollTop: $('html').offset().top
    }, 1000);
  });
});