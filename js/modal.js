const catalogGlav = document.querySelector('[data-catalog]')

catalogGlav.addEventListener('click', function(event) {
    // 1 Открытие модалки
    // 2 Подставить контент
    
    if (event.target.hasAttribute('data-rex')) {
        
        document.getElementById('my-modal').classList.add('open')
    // Находим карточку с товаром внутри которой был совершен клик
    const card = event.target.closest('.catalog-card')
    // 2-1 получить данные из карточки по которой кликнули
    const modalInfo = {
        imgSrc: card.querySelector('.catalog-card-img').getAttribute('src'),
        title: card.querySelector('.catalog-card-text').innerText,
        desc: card.querySelector('.catalog-card__description').innerText,
        prim: card.querySelector('.catalog-card_prim').innerText
      }
      console.log(modalInfo)
    // 2-2 подставить в нужные места
      const modalContent = document.querySelector('.modalbox-all')
      modalContent.innerHTML = `<div class="modalbox-left">
                                    <img src="${modalInfo.imgSrc}" alt="" class="modalbox-left-img">
                                </div>
                                <div class="modalbox-right">
                                    <h1 class="modal-box-right-t">${modalInfo.title}</h1>
                                    <h3 class="modalbox-right-title">Описание:
                                    </h3>
                                    <p class="modalbox-right-text">
                                    ${modalInfo.desc}
                                    </p>
                                    <p class="modalbox-right-text"><strong> Применение: </strong> ${modalInfo.prim}</p>   
                                </div>`
            
    


    }
})
document.getElementById('close-my-mode-btn').addEventListener('click', function() {
    // 3 закрыть и очистить модалку
    const myModal = document.getElementById('my-modal')
    myModal.classList.remove('open')
    

})


