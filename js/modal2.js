const btnCor = document.querySelector('[data-zakaz]')
const btnClose = document.getElementById('close-my-mode-btn-cor')
const cartFormElement = document.querySelector('.cart-form')
const saccessMessageElement = document.querySelector('.success-message')

btnCor.addEventListener('click', function () {
  document.getElementById('my-modal-cor').classList.add('open')
})




btnClose.addEventListener('click', function () {
  const myModalCor = document.getElementById('my-modal-cor')
  myModalCor.classList.remove('open')
  cartFormElement.classList.remove('none')
  saccessMessage.classList.add('none')
})