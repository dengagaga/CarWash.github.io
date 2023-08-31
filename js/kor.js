// Корзина 

let cartItems = []
if (localStorage.getItem('corzina')) {

  let jsonCor = JSON.parse(localStorage.getItem('corzina'))
  cartItems = [...jsonCor]
}

window.addEventListener('click', function (event) {
  // Проверяем что клик был совершен по кнопке + в корзину
  if (event.target.hasAttribute('data-cart')) {

    // Находим карточку с товаром внутри которой был совершен клик
    const card = event.target.closest('.catalog-card')
    // console.log(card)
    // Собираем данные с этого товара и записываем их в один объект 
    const price = Number(card.querySelector('.price__value').innerText)
    const counter = Number(card.querySelector('[data-counter]').innerText)
    const productInfo = {
      id: Number(card.dataset.id),
      imgSrc: card.querySelector('.catalog-card-img').getAttribute('src'),
      title: card.querySelector('.catalog-card-text').innerText,
      counter: counter,
      price: price,
      allPrice: price * counter
    }
    console.log(productInfo)

    // comandText.innerText = productInfo.decsripttion
    // Проверяем есть ли такой товар в корзине 
    //
    // Если товар есть в корзине  
    const currentCartItem = cartItems.find(cartItem => cartItem.id === productInfo.id)
    if (currentCartItem) {
      currentCartItem.counter += productInfo.counter
      currentCartItem.allPrice = currentCartItem.price * currentCartItem.counter
    } else {
      cartItems.push(productInfo)
    }
    localStorage.setItem('corzina', JSON.stringify(cartItems))
  }


})



// const coqzinaCard = document.querySelector('.corzina-card')

// btnCorzina.onclick = function () {
//     coqzinaCard.classList.add('corzina-hidden')
// }
// Удаление из корзины
// const btnCorzina= document.querySelector('.corzina-btn')

// btnCorzina.onclick = function () {
//     itemInCart.classList.toggle('corzina-hidden')
// }


const catalog = document.querySelector('[data-catalog]')

function plusMinus(event) {  // Добавляем прослушку на всем окне

  let counter

  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {

    const counterWrapper = event.target.closest('.counter-wrapper')  // Находим обертку счётчика


    counter = counterWrapper.querySelector('[data-counter]')  // Находим див с числом счётчика

  }




  if (event.target.dataset.action === 'plus') { // Проверяем является ли элемент по которому кликнули кнопкой Плюс

    counter.innerText = ++counter.innerText
  }

  if (event.target.dataset.action === 'minus') {

    if (+counter.innerText > 0) {

      counter.innerText = --counter.innerText  // Если счетчки больше, уменьшаем его на 1
    }
  }
  console.log(cartItems)
}
if (catalog) catalog.addEventListener('click', plusMinus)










// DARK MODE
// const btnDarkMode = document.querySelector('.dark-mode-btn')

// btnDarkMode.onclick = function () {
//   btnDarkMode.classList.toggle('dark-mode-btn--active')
//   document.body.classList.toggle('dark-mode')
// }




// const btnMore = document.querySelector('.btn-more')
// const hidCard = document.querySelectorAll('#hidden-card')
// const btnScr = document.querySelector('.btn-skr')

// btnMore.onclick = function () {
//   hidCard.forEach(function (card) {
//     card.classList.toggle('hidden')

//     if (card.classList.contains('hidden')) {
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

