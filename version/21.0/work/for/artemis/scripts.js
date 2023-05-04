fetch('./cohorts.md')
  .then(response => response.text())
  .then(text => render(text))

function render(text) {
  document.body.innerHTML = marked(text)

  wrapSiblings('h1, h2')
  centerSections()
  externalizeLinks()
}