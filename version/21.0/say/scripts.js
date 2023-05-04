const entries = {
  '404': { title: '🤷🏽‍♂️' },
  'readme': { title: 'Say Relax' },
  'questions': {
    added: '2021-01-13',
    title: 'Question Frameworks',
  }
}
const hash = location.hash.substring(2).replace(/\/$/, '')
let slug = entries.hasOwnProperty(hash) ? hash : 404

if (!hash) slug = 'readme'

fetch(`./${slug}.md`)
  .then(response => response.text())
  .then(text => renderMarkdown(text))

function renderMarkdown(text) {
  document.getElementById('render').innerHTML = marked(text)
  document.dispatchEvent(new Event('MarkdownReady'))
  document.title = 'M B — '+ entries[slug].title
}

document.addEventListener('MarkdownReady', (e) => {
  wrapSiblings('h1, h2')
  centerSections('#render')
  externalizeLinks()
})