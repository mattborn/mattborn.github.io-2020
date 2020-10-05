window.addEventListener('DOMContentLoaded', (e) => {
  wrapSiblings('h1, h2')
  centerSections()
  externalizeLinks()
  wrapImages()
  linkImages()

  ScrollReveal().reveal('.Reveal', {
    cleanup: true,
    distance: '20%',
    interval: 50,
    origin: 'bottom'
  })
})

function wrapImages() {
  document.querySelectorAll('img').forEach(img => {
    if (!img.parentNode.classList.contains('Reveal')) {
      const div = document.createElement('div')
      div.className = 'Reveal'
      img.parentNode.insertBefore(div, img)
      div.appendChild(img)
    }
  })
}

function linkImages() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', (e) => {
      location.assign(img.src)
    })
  })
}