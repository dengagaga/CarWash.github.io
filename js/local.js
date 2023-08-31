const cartWrapper = document.querySelector('.cart-wrapper')
const btnCorElement = document.querySelector('[data-zakaz]')
let jsonCor

if (localStorage.getItem('corzina')) {
  jsonCor = JSON.parse(localStorage.getItem('corzina'))
  renderCardItems()
}


function renderCardItems() {
  if (jsonCor.length === 0) {
    cartWrapper.innerHTML = `
    <div class="corzina-none">
      <h1 class="corzina-none-title">ВАША КОРЗИНА ПУСТА</h1>
      <p class="corzina-none-text">Воспользуйтесь каталогом, чтобы добавить товар.</p>
      <a href="shampooscars.html" class="corzina-none--link">НАЧАТЬ ПОКУПКИ</a>
    </div>
    `
    btnCorElement.classList.add('none')
  } else {
    const items = jsonCor.map(itemCart => {
      return `<div class="corzina-card" data-id="${itemCart.id}">
          <a href=""><img src="${itemCart.imgSrc}" alt="" class="corzina-card-img"></a>
          <h3 class="corzina-card-text">${itemCart.title}</h3>
          <span class="price-corzina">${itemCart.allPrice} руб.</span>
        <div class="details-wrapper  corzina-wrapper">
            <div class="items counter-wrapper corzina-item">
                <div class="items__control" data-action="minus">-</div>
                <div class="items__current" data-counter>${itemCart.counter}</div>
                <div class="items__control" data-action="plus">+</div>
            </div>
        </div>
        <div class="btn-corzina">
            <button  data-action="delete"  type="button" class="btn btn-block btn-outline-warning corzina-btn" >
                Удалить
            </button>
        </div>
         </div>`
    }).join('')

    const totalPrice = jsonCor.reduce((currentSum, cartItem) => {
      return currentSum + cartItem.allPrice
    }, 0)
    const totalPriceHtml = `<div class="total-price">Итого: ${totalPrice} рублей</div>`

    cartWrapper.innerHTML = ''
    cartWrapper.insertAdjacentHTML('afterbegin', totalPriceHtml)
    cartWrapper.insertAdjacentHTML('beforeend', items)
    btnCorElement.classList.remove('none')
  }
}
function plusOne(event) {  // Добавляем прослушку на всем окне

  let counter
  let itemCardId

  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus' || event.target.dataset.action === 'delete') {

    const counterWrapper = event.target.closest('.corzina-card')  // Находим обертку счётчика


    counter = counterWrapper.querySelector('[data-counter]')  // Находим див с числом счётчика
    const corCard = event.target.closest('.corzina-card')
    itemCardId = Number(corCard.dataset.id)
  }




  if (event.target.dataset.action === 'plus') { // Проверяем является ли элемент по которому кликнули кнопкой Плюс
    let counterPlus = Number(counter.innerText)
    counterPlus = counterPlus + 1
    //  counter.innerText = counterPlus
    const currentCartItem = jsonCor.find(function (item) {
      return item.id === itemCardId

    })
    currentCartItem.counter = counterPlus
    currentCartItem.allPrice = currentCartItem.price * currentCartItem.counter
    renderCardItems()
    console.log(currentCartItem)
    localStorage.setItem('corzina', JSON.stringify(jsonCor))
  }

  if (event.target.dataset.action === 'minus') {
    let counterMinus = Number(counter.innerText)
    counterMinus = counterMinus - 1
    if (+counter.innerText > 0) {
      // counter.innerText = counterMinus           
      const currentCartItem = jsonCor.find(function (item) {
        return item.id === itemCardId

      })
      currentCartItem.counter = counterMinus
      currentCartItem.allPrice = currentCartItem.price * currentCartItem.counter
      renderCardItems()
      console.log(currentCartItem)
      localStorage.setItem('corzina', JSON.stringify(jsonCor))
    }
  }

  if (event.target.dataset.action === 'delete') {

    jsonCor = jsonCor.filter(function (item) {
      return item.id !== itemCardId
    })
    localStorage.setItem('corzina', JSON.stringify(jsonCor))
    jsonCor = JSON.parse(localStorage.getItem('corzina'))
    renderCardItems()
  }
}

cartWrapper ? cartWrapper.addEventListener('click', plusOne) : ''


//mask input
const sendTel = document.querySelector('#form-phone')
const telMask = new Inputmask('+7 999 999-99-99')

telMask.mask(sendTel)

//validate form
const validationSendCartForm = new JustValidate('#sendCartForm')

const cartForm = document.querySelector('.cart-form')
const saccessMessage = document.querySelector('.success-message')

validationSendCartForm
  .addField('#form-name', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите ФИО'
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'ФИО дожно содержать минимум 2 символа'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Не больше 30 символов'
    }
  ])
  .addField('#form-phone', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Телефон обязателен'
    },
    {
      rule: 'function',
      validator: function () {
        const phone = sendTel.inputmask.unmaskedvalue()
        return phone.length === 10
      },
      errorMessage: 'Введите корректный телефон'
    }
  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);

    let formData = new FormData(event.target);

    const cartItems = JSON.parse(localStorage.getItem('corzina'))
    const stringItems = cartItems.map(item => `${item.title} — ${item.price}руб / ${item.counter}шт`)
    formData.set('products', stringItems.join(','))

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено')
          cartForm.classList.add('none')
          saccessMessage.classList.remove('none')
          jsonCor = []
          localStorage.setItem('corzina', JSON.stringify(jsonCor))
          renderCardItems()
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    event.target.reset();
  })

