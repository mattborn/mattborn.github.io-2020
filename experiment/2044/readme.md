# Experiment # 2044 — Vanilla Router

## Push

For the back + forward buttons to work in Single Page Apps, we need to explicitly store each route change in the browser history.

```js
function goHere(path) {
  history.pushState({}, path, location.origin +'/'+ path)
}
```

[Learn more](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)

## Buttons that route

When any element with `data-route` is clicked, a routing function runs.

```js
document.addEventListener('click', (e) => {
  const data = e.target.dataset
  if ('route' in data) {
    e.preventDefault()
    goHere(data.route)
  }
})
```

See for yourself when you <a href="#" data-route="hello">click this text</a>.

```html
<a href="#" data-route="hello">click this text</a>
```

## Pop

Getting the back button to work requires listening to `popstate` in order to update the page without reloading.

```js
window.addEventListener('popstate', (e) => render(getPath()))
```

[Learn more](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)

## 404.html

If you refresh the page on a route that only exists on the front end and not on the server, you need the server to redirect to wherever you were before and convert the path to a hash which will fire `popstate` immediately.

```js
const l = window.location
const p = l.pathname
if (p.startsWith('/ex')) l.replace(l.origin + p.substring(0,16) +'/#'+ p.substring(16))
```

I placed the script above in `/404.html` since that loads by default on [Github Pages](https://pages.github.com) and when using the [serve](https://github.com/vercel/serve) library locally.

You’ll need to roll your own. [Learn more](https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html)

## Parse the URL

Anytime the page needs to be rendered when a button hasn’t been clicked (like the initial page load or refresh), we need to get the path from the URL.

```js
function getPath() {
  return location.pathname || location.hash || 'readme'
}
```

You’ll need to roll your own. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/Location)

## Load page component

Since the main purpose of rendering is to update the content of the page, I like to have a dedicated function that handles this.

```js
function render(path) {
  // if route has a template, load it
  const html = library.getElementById(path)
  if (html) document.getElementById('scroll').innerHTML = html.innerHTML
  …
}
```

I like to fetch & cache templates from a separate file before rendering.

```js
let library
fetch('./library.html')
  .then(res => res.ok ? res.text() : Promise.reject(res))
  .then(str => {
    library = new DOMParser().parseFromString(str, 'text/html')
    document.getElementById('example').innerHTML = library.getElementById('layout').innerHTML
    render(getPath())
  })
  .catch(err => console.warn(err))
```

[Learn more](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Run page controller

Since it’s common to run page-specific logic, I like to attempt to run a function with a name that maps to the route as part of the render.

```js
const controllers = { readme, another, … }

function render(path) {
  …
  // if route has a controller, run it
  if (controllers.hasOwnProperty(path)) controllers[path]()
  …
}

function readme() { … }
```

If your use case is simple, you probably don’t need this. If your use case is complex, you probably need something smarter than this.

## Highlight buttons

If you click the buttons under “Local menus” to the left, you’ll notice the highlight always matches the URL. Click events might seem like a good time to do this, but it should happen during render to keep things in sync.

```js
function render(path) {
  …
  // mark anything pointing to this route as active
  markActive(path)
}

function markActive(path) {
  document.querySelectorAll('[data-route]').forEach(el => {
    // remove active class from anything pointing to a route
    el.classList.remove('active')
    // add active class to matching routes
    if (el.dataset.route === path) el.classList.add('active')
  })
}
```

Ok, that’s it. Stay classy. Go vanilla.

[← View previous experiment](/experiment/2041/)