// learn about these three at https://mattborn.com/experiment/2039/

function centerSections(selector = 'body') {
  // wrap all content children innerHTML with div.Center
  Array.from(document.querySelector(selector).children).forEach(child => {
    const div = document.createElement('div')
    div.className = 'Center'
    while (child.firstChild) div.appendChild(child.firstChild)
    child.appendChild(div)
  })
}

function externalizeLinks() {
  // open external links in a new tab
  document.querySelectorAll('a[href^=h]').forEach(link => {
    link.classList.add('External')
    link.target = '_blank'
  })
}

function wrapSiblings(selector) {
  // important: must be called before centerSections()
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

function hoistCodeClasses() {
  document.querySelectorAll('pre > code').forEach(code => {
    code.parentNode.classList.add(code.className || 'language-markup')
    code.removeAttribute('class')
  })
}