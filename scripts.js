fetch('./words.md')
  .then(response => response.text())
  .then(text => render(text))

function render(text) {
  document.body.innerHTML = marked(text)

  wrapSiblings('h1, h2')
  centerSections()
  externalizeLinks()
}

function wrapSiblings(selector) {
  document.querySelectorAll(selector).forEach(el => {

    const wrapper = document.createElement('div')
    el.parentNode.insertBefore(wrapper, el)

    let siblings = []
    siblings.push(el)
    el = el.nextElementSibling
    while (el) {
      // stop group before each selector match
      if (el.matches(selector)) break
      siblings.push(el)
      el = el.nextElementSibling
    }
    siblings.forEach(sibling => wrapper.appendChild(sibling))

  })
}

function externalizeLinks() {
  // open external links in a new tab
  document.querySelectorAll('a[href^=h]').forEach(link => {
    link.classList.add('External')
    link.target = '_blank'
  })
}

function centerSections(selector = document.body) {
  // wrap all content children innerHTML with div.Center
  Array.from(selector.children).forEach(child => {
    const div = document.createElement('div')
    div.className = 'Center'
    while (child.firstChild) div.appendChild(child.firstChild)
    child.appendChild(div)
  })
}