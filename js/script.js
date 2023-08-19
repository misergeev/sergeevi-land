document.addEventListener('DOMContentLoaded', function() {
  /* Копирование и показ хедера */
  var header, headerClone, headerFixed;

  header = document.querySelector('.header');
  headerClone = header.cloneNode(true);
  headerFixed = document.querySelector('.header__fixed');
  
  headerFixed.appendChild(headerClone);

  function showHeaderFix() {
    if (window.pageYOffset > 150) {
      headerFixed.classList.add('show');
    } else {
      headerFixed.classList.remove('show');
    }
  }

  showHeaderFix();

  /* Кнопка скролла к началу страницы */
  var buttonTop;

  buttonTop = document.querySelector('.button__top');

  function showButtonTop() {
    if (window.pageYOffset > 500) {
      buttonTop.classList.add('show');
    } else {
      buttonTop.classList.remove('show');
    }
  }

  showButtonTop();

  buttonTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  });

  /* Показ садов из списка при скролле */
  var gardens, gardensElements;

  gardens = document.querySelector('.gardens');
  gardensElements = gardens.querySelectorAll('.gardens__item');

  function gardensShowItem() {
    gardensElements.forEach(function (item) {
      if ((window.pageYOffset >= item.offsetTop - window.innerHeight + 250) && (item.offsetParent !== null)) {
        item.classList.add('show');
      } else {
        item.classList.remove('show');
      }
    });
  }

  gardensShowItem();

  /* Показ садов из списка при нажатии на кнопку "Все сады" */
  var gardensList, moreGardensList, moreGardensElements, moreGardensButton;

  gardensList = gardens.querySelector('.gardens__wrapper');
  moreGardensList = gardens.querySelector('.gardens__more');
  moreGardensElements = moreGardensList.querySelectorAll('.gardens__item');
  moreGardensButton = document.querySelector('.js-more-gardens');
  
  moreGardensButton.addEventListener('click', function() {
    moreGardensElements.forEach(function (item) {
      gardensList.appendChild(item);
    });

    gardensShowItem();

    moreGardensList.remove();
    moreGardensButton.parentNode.remove();
    gardens.style.marginBottom = "116px";
  });

  /* Скролл до списка с садами */
  var scrollDownFirstScreen;

  scrollDownFirstScreen = document.querySelector('.js-scroll-down');

  scrollDownFirstScreen.addEventListener('click', function() {
    window.scrollTo({
        top: gardens.offsetTop - 150,
        behavior: 'smooth'
      });
  });

  /* Повторное выполнение функций при скролле */
  document.addEventListener('scroll', function() {
    // Показ хедера
    showHeaderFix();
    // Кнопка скролла к началу страницы
    showButtonTop();
    // Показ садов из списка при скролле
    gardensShowItem();
  });
});

$(document).ready(function() {
  // Табы на детальной транице сада
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

  // Кнопка на детальной странице сада для перехода в галерею
  $(document).on('click', '.js-garden-gallery', function() {
    $('body, html').animate({
      scrollTop: $('.gardensDetail__tabs').offset().top - 150
    }, 10);

    setTimeout(function() {
      $('.js-garden-tab[data-tab="gallery"]').trigger('click');
    }, 200);
  });

  // Открытие статьи
  $(document).on('click', '.js-articles-item', function() {
    $('body').addClass('body-overflow-hidden');
    $(this).next().fadeIn(300, function() {
      $(this).addClass('show');
    });
  });

  // закрытие статьи
  $(document).on('click', '.js-articles-body-close', function() {
    var articlesBody = $(this).parents('.articles__body');
    articlesBody.removeClass('show');

    setTimeout(function() {
      $('body').removeClass('body-overflow-hidden');
      articlesBody.fadeOut(300);
    }, 300);
  });

  if ($('.aboutSlider__wrapper').length) {
		var aboutSlider = new Swiper($('.aboutSlider__wrapper'), {
			direction: 'horizontal',
			speed: 400,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 100,
			loop: true,
      slideToClickedSlide: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span></span></div>';
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
		});
	}
});