/* ------  Каталог ------ */


const btnMore = document.querySelector('.btn-more')
const hidCard = document.querySelectorAll('#hidden-card')
const btnScr = document.querySelector('.btn-skr')

btnMore.onclick = function () {
  hidCard.forEach(function(card) {
    card.classList.toggle('hidden')

    if ( card.classList.contains('hidden')) {
      btnMore.textContent = "Показать еще"
    } else {
      btnMore.textContent = "Закрыть"
    }
  })
}
  