const controllers = { readme }

let library
fetch('./library.html')
  .then(res => res.ok ? res.text() : Promise.reject(res))
  .then(str => {
    library = new DOMParser().parseFromString(str, 'text/html')
    document.getElementById('example').innerHTML = library.getElementById('layout').innerHTML
    render(getPath())
  })
  .catch(err => console.warn(err))

function getPath() {
  return location.pathname.substring(17) || location.hash.substring(2) || 'readme'
}

function goHere(path) {
  history.pushState({}, path, location.origin +'/experiment/2044/'+ path)
  render(path)
}

function render(path) {
  // if route has a template, load it
  const html = library.getElementById(path)
  if (html) document.getElementById('scroll').innerHTML = html.innerHTML
  // if route has a controller, run it
  if (controllers.hasOwnProperty(path)) controllers[path]()
  // mark anything pointing to this route as active
  markActive(path)
  // repeat these taken from readme()
  wrapSiblings('h1')
  centerSections('#scroll')
}

window.addEventListener('popstate', () => render(getPath()))

document.addEventListener('click', (e) => {
  const data = e.target.dataset
  if ('route' in data) {
    e.preventDefault()
    goHere(data.route)
  }
  if (e.target.classList.contains('Switch')) toggle(e.target)
})

function readme() {
  fetch('./readme.md')
    .then(response => response.text())
    .then(text => mark(text))
    .catch(err => console.warn(err))

  function mark(text) {
    Prism.manual = true
    const renderer = {
      code(code, lang) {
        code = this.options.highlight(code, lang)
        return '<pre class="language-'+ lang +'"><code>'+ code +'</code></pre>'
      }
    }
    marked.use({
      highlight: (code, lang) => Prism.highlight(code, Prism.languages[lang || 'markup']),
      renderer
    })

    document.getElementById('scroll').innerHTML = marked(text)

    wrapSiblings('h1, h2')
    centerSections('#scroll')
    externalizeLinks()
  }
}

function markActive(path) {
  document.querySelectorAll('[data-route]').forEach(el => {
    // remove active class from anything pointing to a route
    el.classList.remove('active')
    // add active class to matching routes
    if (el.dataset.route === path) el.classList.add('active')
  })
}

function toggle(el) {
  const c = el.classList
  c.contains('active') ? c.remove('active') : c.add('active')
}