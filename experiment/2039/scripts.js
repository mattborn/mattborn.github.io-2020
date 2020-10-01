fetch('./post.md')
  .then(response => response.text())
  .then(text => renderMarkdown(text))

function renderMarkdown(text) {
  Prism.manual = true
  marked.setOptions({
    highlight: (code, lang) => Prism.highlight(code, Prism.languages[lang || 'markup'])
  })

  document.body.innerHTML = marked(text)
  document.dispatchEvent(new Event('MarkdownReady'))
}

document.addEventListener('MarkdownReady', (e) => {
  wrapSiblings('h1, h2')
  centerSections()
  externalizeLinks()
  hoistCodeClasses()
})