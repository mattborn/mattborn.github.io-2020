if (moment().isBetween(moment('05:55', 'hh:mm'), moment('06:05', 'hh:mm'))) {
  location.replace('https://zoom.us/j/99942915185?                       pwd=WWJOMlRudDBCNm1xOFA1Y1NncUlqQT09')
} else { console.log('It’s not 6am.') }

fetch('./readme.md')
  .then(response => response.text())
  .then(text => renderMarkdown(text))

function renderMarkdown(text) {
  document.getElementById('readme').innerHTML = marked(text)
  document.dispatchEvent(new Event('MarkdownReady'))
}

document.addEventListener('MarkdownReady', (e) => {
  wrapSiblings('h1, h2')
  centerSections('#readme')
  externalizeLinks()
})