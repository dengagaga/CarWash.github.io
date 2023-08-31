const btnDarkMode = document.querySelector('.dark-mode-btn')

if (localStorage.getItem('darkMode') === 'dark') {
  btnDarkMode.classList.add('dark-mode-btn--active')
  document.body.classList.add('dark-mode')
}
// } else if (localStorage.getItem('darkMode') === 'light') {
//   btnDarkMode.classList.remove('dark-mode-btn--active')
//   document.body.classList.remove('dark-mode')
// }


btnDarkMode.onclick = function () {
  btnDarkMode.classList.toggle('dark-mode-btn--active')
  const isDark = document.body.classList.toggle('dark-mode')

  if (isDark) {
    localStorage.setItem("darkMode", "dark")
  } else {
    localStorage.setItem("darkMode", "light")
  }
}
