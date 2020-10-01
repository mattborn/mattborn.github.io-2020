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
  animateHeading([['Cabinet','Animated','Text'],['Cards','Headings','Transitions']])
})

function animateHeading(arr) {
  const h1 = document.querySelector('h1')
  const split = h1.innerText.split(' ')
  const start = split.indexOf(arr[0][0])
  const before = split.slice(0, start)
  const end = split.indexOf(arr[arr.length - 1][0])
  if (start < 0 || end < 0) throw 'Words not found'
  const words = split.slice(start, end + 1)
  const list = document.createElement('div')
  list.id = 'Words'

  h1.innerHTML = before.join(' ')
  words.map(word => {
    const item = document.createElement('div')
    item.className = 'Word'
    item.innerText = word
    list.appendChild(document.createTextNode(' '))
    list.appendChild(item)
    return item
  }).forEach((el, i) => animateWord(el, arr[i]))
  h1.appendChild(list)
}

function animateWord(el, arr) {
  setTimeout(() => {
    el.style.maxHeight = el.offsetHeight +'px'

    const copy = arr.map((x) => x)
    const current = el.innerText
    el.innerHTML = ''
    // add current node
    const a = document.createElement('div')
    a.innerText = current
    el.appendChild(a)
    // add next node
    const b = document.createElement('div') 
    copy.splice(copy.indexOf(current), 1) // remove current value
    const next = randomValue(copy)
    b.innerText = next
    el.appendChild(b)
    // add class
    setTimeout(() => {
      el.classList.add('move')
      // cleanup after animation is finished
      setTimeout(() => {
        el.innerHTML = next
        el.style.removeProperty('max-height')
        el.classList.remove('move')
      }, 500)
    }, 50)

    animateWord(el, arr)
  }, randomWait(3,8))
}

function randomWait(min = 0, max = 10) {
  return (Math.random() * (max - min) + min) * 1000
}

function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}