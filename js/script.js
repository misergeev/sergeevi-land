document.addEventListener('DOMContentLoaded', function() {
  /* Функции для плавного появляния и исчезновения документа */
  function fadeIn(element) {
    element.style.cssText = 'opacity: 0; display: block; transition: opacity 0.3s ease 0s;';

    setTimeout(function() {
      element.style.opacity = 1;
    }, 10);
  };

  function fadeOut(element) {
    element.style.opacity = 0;
  
    setTimeout(function() {
      element.style.display = 'none';
    }, 300);
  };

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

  if (gardens !== null) {
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
  }

  /* Табы на детальной странице сада */
  if (document.querySelector('.gardensDetail') !== null) {
    var gardenTabs, gardenTabList, gardenContent, gardenContentItems, gardenGallery, gardenGalleryButton, juxtapose;

    gardenTabs = document.querySelector('.gardensDetail__tabs');
    gardenTabList = gardenTabs.querySelectorAll('.js-garden-tab');
    gardenContent = document.querySelector('.gardensDetail__content');
    gardenContentItems = gardenContent.querySelectorAll('.gardensDetail__content-item');
    gardenGallery = gardenContent.querySelector('.gardensDetail__gallery');
    gardenGalleryButton = gardenContent.querySelector('.js-garden-gallery');
    juxtapose = gardenContent.querySelectorAll('.juxtapose');

    gardenTabList.forEach(function (gardenTab, i) {
      gardenTab.addEventListener('click', function() {
        var thisGardenTab = this;

        gardenTabList.forEach(function (elem, k) {
          elem.classList.remove('active');
          if (i === k) elem.classList.add('active');
        });

        gardenContent.style.cssText = 'opacity: 0; height: 100vh;';

        setTimeout(function() {
          gardenContentItems.forEach(function (item, q) {
            item.classList.remove('show');
            if (i === q) item.classList.add('show');
          });
          
          if (thisGardenTab.getAttribute('data-tab') == 'gallery') {
            var gardenGalleryIsotope = new Isotope(gardenGallery, {
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

          if (thisGardenTab.getAttribute('data-tab') == 'history') {
            juxtapose.forEach(function (item) {
              var juxtaposeHeight = item.offsetWidth / item.getAttribute('data-ratio');
              juxtaposeHeight = Math.floor(juxtaposeHeight) + 'px';
              item.style.height = juxtaposeHeight;
            });
          }
        }, 300);

        setTimeout(function() {
          gardenContent.style.cssText = 'opacity: 1; height: auto;';
        }, 700);
      });
    });

    /* Кнопка на детальной странице сада для перехода в галерею */
    gardenGalleryButton.addEventListener('click', function() {
      window.scrollTo({
        top: gardenTabs.offsetTop - 150,
        behavior: 'instant'
      });

      setTimeout(function() {
        document.querySelector('[data-tab="gallery"]').click();
      }, 100);
    });
  }

  /* Статьи. Открытие и закрытие статьи. */
  var articlesItemList, articlesItemCloseList;

  articlesItemList = document.querySelectorAll('.js-articles-item');
  articlesItemCloseList = document.querySelectorAll('.js-articles-body-close');

  if (articlesItemList) {
    articlesItemList.forEach(function(item) {
      item.addEventListener('click', function() {
        document.body.classList.add('body-overflow-hidden');

        fadeIn(this.nextElementSibling);
      });
    });

    articlesItemCloseList.forEach(function(item) {
      item.addEventListener('click', function() {
        var articlesBlock = item.parentElement.parentElement.parentElement.parentElement
        document.body.classList.remove('body-overflow-hidden');

        fadeOut(articlesBlock);
      });
    });
  }

  /* Слайдер на странице "О нас" */
  var aboutSliderBlock;

  aboutSliderBlock = document.querySelector('.aboutSlider__wrapper');

  if (aboutSliderBlock !== null) {
		var aboutSlider = new Swiper(aboutSliderBlock, {
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

  /* Повторное выполнение функций при скролле */
  document.addEventListener('scroll', function() {
    // Показ хедера
    showHeaderFix();
    // Кнопка скролла к началу страницы
    showButtonTop();
    // Показ садов из списка при скролле
    if (gardens !== null) {
      gardensShowItem();
    }
  });
});