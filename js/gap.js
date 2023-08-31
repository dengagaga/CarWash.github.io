const swiper = new Swiper('.popular-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      301: {
        slidesPerView: 2,
      },
      620: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 5,
      },
      
      
    }
  });

  // function getDirection() {
  //   var windowWidth = window.innerWidth;
  //   var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  //   return direction;
  // }
/* ------  Каталог ------ */


// const btnMore = document.querySelector('.btn-more')
// const hidCard = document.querySelectorAll('#hidden-card')
// const btnScr = document.querySelector('.btn-skr')

// btnMore.onclick = function () {
//   hidCard.forEach(function(card) {
//     card.classList.toggle('hidden')

//     if ( card.classList.contains('hidden')) {
//       btnMore.textContent = "Показать еще"
//     } else {
//       btnMore.textContent = "Закрыть"
//     }
//   })
// }


/* ------  Плавный скрол по ссылкам ------ */

const anchors = document.querySelectorAll('a[href*="#"]')

anchors.forEach(anchor => {
  anchor.addEventListener('click', event => {
    event.preventDefault()
    const blockID = anchor.getAttribute('href').substring(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})

/*
btnScr.onclick = function () {
  hidCard.forEach(function(cards) {
    cards.classList.add('hidden')

  })
} */




// Корзина 
// Отслеживаем клик на странице
window.addEventListener('click' , function (event) {
  // Проверяем что клик был совершен по кнопке + в корзину
  if (event.target.hasAttribute('data-cart')) {

    // Находим карточку с товаром внутри которой был совершен клик
    const card = event.target.closest('.catalog-card')
    // console.log(card)
    // Собираем данные с этого товара и записываем их в один объект 
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector('.catalog-card-img').getAttribute('src'),
      title: card.querySelector('.catalog-card-text').innerText,
      price: card.querySelector('.price').innerText,
      counter: card.querySelector('[data-counter]').innerText
    }
    // console.log(productInfo)
  } 

})

window.addEventListener('click', function(event) {  // Добавляем прослушку на всем окне
       
  let counter
   
  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus' ) {

      const counterWrapper = event.target.closest('.counter-wrapper')  // Находим обертку счётчика

      
      counter = counterWrapper.querySelector('[data-counter]')  // Находим див с числом счётчика

  }

      

  
  if (event.target.dataset.action === 'plus') { // Проверяем является ли элемент по которому кликнули кнопкой Плюс

     counter.innerText = ++counter.innerText
  }

  if (event.target.dataset.action === 'minus') {

      if ( +counter.innerText > 0 ) {
          
              counter.innerText = --counter.innerText  // Если счетчки больше, уменьшаем его на 1
          }
  }
})