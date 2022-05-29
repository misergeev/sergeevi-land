$(document).ready(function() {
  var header = $('.header').clone();
  $('.header__fixed').html(header);

  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('.header__fixed').addClass('show');
    } else {
      $('.header__fixed').removeClass('show');
    }
  });

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

  function gardensShowItem() {
    $('.gardens__wrapper .gardens__item').each(function() {
      if ($(window).scrollTop() >= $(this).offset().top - ($(window).height() - 250)) {
        $(this).addClass('show');
      }
    });
  }

  gardensShowItem();
  
  $(window).scroll(function() {
    gardensShowItem();
  });

  $(document).on('click', '.js-more-gardens', function() {
    var moreGardens = $('.gardens__more').html();
    $('.gardens__wrapper').append(moreGardens);
    gardensShowItem();
    $('.gardens__more').remove();
    $(this).parent().fadeOut(300);
    $('.gardens').css('margin-bottom', 116);
  });

});