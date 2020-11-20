fetch('./readme.md')
  .then(response => response.text())
  .then(text => mark(text))
  .catch(err => console.warn(err))

function mark(text) {
  document.getElementById('readme').innerHTML = marked(text)

  wrapSiblings('h1, h2')
  centerSections('#readme')
  externalizeLinks()
}