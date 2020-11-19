
// initial load

let data = [
  {label: 'First data object'},
  {label: 'Second data object'},
]

let library
fetch('./library.html')
  .then(res => res.ok ? res.text() : Promise.reject(res))
  .then(str => {
    library = new DOMParser().parseFromString(str, 'text/html')
    document.getElementById('render').innerHTML = library.getElementById('template').innerHTML
    render(getPath())
  })
  .catch(err => console.warn(err))

function getPath() {
  return slash(location.pathname.substring(17) || location.hash.substring(2) || 'a')
}

const g = document.getElementById.bind(document)
const q = document.querySelectorAll.bind(document)

let state = {
  id: 'list',
  page: 'a',
  panel: 'uno',
  tab: 'alpha',
}

function render(path) {
  const s = state
  const p = s.parts = path.split('/')
  s.page = p[0] || s.page
  s.id = p[1] || 'list'
  s.tab = p[2] || s.tab
  s.panel = p[3] || s.panel

  // before render, ensure a route with id always has a tab
  if (p[1] && !p[2]) {
    route(getPath() + s.tab)
    return
  }

  // first, page
  g('page').innerHTML = library.getElementById(s.page).innerHTML
  // second, data
  if (s.page === 'b') {
    if (isNaN(s.id)) {
      toggle(g('list'))
    } else {
      toggle(g('item'))
      // third, tab
      toggle(g(s.tab))
      // fourth, panel
      toggle(g(s.panel))
    }
  }
  
  // after render, mark whatever is active
  active()
}

// clicks

document.addEventListener('click', (e) => {
  const data = e.target.dataset
  if ('route' in data) {
    e.preventDefault()
    route(data.route)
  }
  if ('panel' in data) panel(data.panel)
})

function route(path) {
  history.pushState({}, path, location.origin +'/experiment/2045/'+ path)
  render(path)
}

function panel(panel) {
  route(getPath().match('(.+?\/){3}')[0] + panel)
}

// helpers
function active() {
  document.querySelectorAll('[data-route]').forEach(el => {
    // remove active class from anything pointing to a route
    el.classList.remove('active')
    // add active class to matching routes
    const r = el.dataset.route
    const p = r.split('/')
    const samePart = state.parts.includes(p[p.length - 1])
    // const samePath = (getPath().slice(0, -1) === r)
    if (samePart) el.classList.add('active')
  })
}

function slash(str) { return str.replace(/\/?$/, '/') }

function swetch(el) {
  const c = el.classList
  c.contains('active') ? c.remove('active') : c.add('active')
}

function toggle(el) {
  Array.from(el.parentNode.children).forEach(sibling => {
    sibling.classList.remove('show')
  })
  el.classList.add('show')
}