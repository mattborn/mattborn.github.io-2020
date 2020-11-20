wrapSiblings('h1')
centerSections('body')
externalizeLinks()

ScrollReveal().reveal('.Billboard', {
  cleanup: true,
  delay: 200,
  distance: '50%',
  interval: 200,
  origin: 'bottom',
})

document.addEventListener('click', e => {
  let el = e.target.parentNode
  while (el) {
    if (el.classList && el.classList.contains('Billboard')) {
      window.scroll({
        behavior: 'smooth',
        top: el.nextElementSibling.offsetTop,
      })
      return
    }
    el = el.parentNode
  }
})