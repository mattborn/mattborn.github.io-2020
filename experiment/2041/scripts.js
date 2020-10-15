fetch('./snippets.md')
  .then(response => response.text())
  .then(text => renderMarkdown(text))

function renderMarkdown(text) {
  Prism.manual = true
  const renderer = {
    code(code, lang) {
      code = this.options.highlight(code, lang)
      return '<div class="Copyable"><pre class="language-'+ lang +'"><code>'+ code +'</code></pre><button class="fas fa-clipboard"></button></div>'
    }
  }
  marked.use({
    renderer,
    highlight: (code, lang) => Prism.highlight(code, Prism.languages[lang || 'markup'])
  })
  document.body.innerHTML = marked(text)
  document.dispatchEvent(new Event('MarkdownReady'))
}

document.addEventListener('MarkdownReady', (e) => {
  wrapSiblings('h1, h2')
  centerSections()
  externalizeLinks()
  makeCodeCopyable()
})

function makeCodeCopyable() {
  const clip = new ClipboardJS('.fa-clipboard', {
    target: (trigger) => trigger.previousElementSibling
  })
  let reset = (el) => setTimeout(() => el.className = 'fas fa-clipboard', 2000)
  clip.on('success', (e) => {
    e.trigger.className += '-check'
    reset(e.trigger)
  })
  clip.on('error', () => {
    e.trigger.className = 'fas fa-times'
    reset(e.trigger)
  })
}