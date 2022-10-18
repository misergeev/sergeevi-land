$(document).ready(function() {
  var header = $('.header').clone();
  $('.header__fixed').html(header);

  function showHeaderFix() {
    if ($(this).scrollTop() > 150) {
      $('.header__fixed').addClass('show');
    } else {
      $('.header__fixed').removeClass('show');
    }
  }

  showHeaderFix();
  $(window).scroll(function() {
    showHeaderFix();
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
      if ($(window).scrollTop() >= $(this).offset().top - ($(window).height() - 100)) {
        $(this).addClass('show');
      } else {
        $(this).removeClass('show');
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

  $(document).on('click', '.js-garden-tab', function() {
    var $this = $(this),
        tabIndex = $this.index();
    
    $('.js-garden-tab').removeClass('active');
    $this.addClass('active');

    $('.gardensDetail__content').css({
      'opacity': 0,
      'height': '100vh',
    });

    setTimeout(function() {
      var contenTab = $('.gardensDetail__content-item').eq(tabIndex);
      $('.gardensDetail__content-item').not(contenTab).removeClass('show');
      $('.gardensDetail__content-item').eq(tabIndex).addClass('show');

      if ($this.attr('data-tab') == 'gallery') {
        $('.gardensDetail__gallery').isotope({
          itemSelector: 'a',
          layoutMode: 'masonry',
          percentPosition: true,
          masonry: {
            gutter: 10,
            horizontalOrder: true,
          }
        });

        $('.gardensDetail__gallery').lightGallery({
          thumbnail: true,
          fullScreen: false,
          zoom: false,
          share: false,
          rotate: false,
          autoplay: false,
          hash: false,
          showThumbByDefault: false,
        }); 
      }

      if ($this.attr('data-tab') == 'history') {
        $('.juxtapose').each(function() {
          var juxtaposeHeight = $(this).width() / $(this).data('ratio');
          juxtaposeHeight = Math.floor(juxtaposeHeight);
          $(this).css('height', juxtaposeHeight);
        });
      }
    }, 300);

    setTimeout(function() {
      $('.gardensDetail__content').css({
        'opacity': 1,
        'height': 'auto'
      });
    },700);
  });

  $(document).on('click', '.js-garden-gallery', function() {
    $('body, html').animate({
      scrollTop: $('.gardensDetail__tabs').offset().top - 150
    }, 10);

    setTimeout(function() {
      $('.js-garden-tab[data-tab="gallery"]').trigger('click');
    }, 200);
  });

  $(document).on('click', '.js-articles-item', function() {
    $('body').addClass('body-overflow-hidden');
    $(this).next().fadeIn(300, function() {
      $(this).addClass('show');
    });
  });

  $(document).on('click', '.js-articles-body-close', function() {
    var articlesBody = $(this).parents('.articles__body');

    articlesBody.removeClass('show');
    setTimeout(function() {
      $('body').removeClass('body-overflow-hidden');
      articlesBody.fadeOut(300);
    }, 300);
  });
});