const body = document.body
const menu = document.querySelector('.menu')
const menuBtn = document.querySelector('.menu-icon')

if (menu && menuBtn) {
    menuBtn.addEventListener('click', () =>  {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        // body.classList.toggle('lock')
    })
}