# Experiment # 2039 — Elegant, Portable Markdown

## Hypothesis

It is possible to render and style markdown in an elegant, featherlight way.

## Thought Process

### Marked

Encapsulation is key to keeping prototypes portable. How might we convert a markdown file into HTML without a full-fledged framework? Let’s try [marked.js](https://marked.js.org) with minimal lines of code.

First, include the script:

```
<script src="https://unpkg.com/marked"></script>
```

Then, fetch & print the markdown file:

```js
fetch('./file.md')
  .then(response => response.text())
  .then(text => document.body.innerHTML = marked(text))
```

Boom. That was easy.

### Sections

When building sites, I prefer to be able to control sections of the page independently. Markdown is nice because it produces flat markup, but this means there are no groups of elements to treat as sections:

```
<p>Boom. That was easy.</p>
<h3 id="sections">Sections</h3>
<p>When building sites, I prefer to be able to control…</p>
```

So I wrote a function that wraps a `div` around each heading and every element until the next heading:

```js
wrapSiblings('h1, h2')
function wrapSiblings(selector) {
  document.querySelectorAll(selector).forEach(el => {

    const wrapper = document.createElement('div')
    el.parentNode.insertBefore(wrapper, el)

    let siblings = []
    siblings.push(el)
    el = el.nextElementSibling
    while (el) {
      // stop group before each selector match
      if (el.matches(selector)) break
      siblings.push(el)
      el = el.nextElementSibling
    }
    siblings.forEach(sibling => wrapper.appendChild(sibling))

  })
}
```

### Centered

Ok, so we have sections of grouped elements generated from markdown, but this introduces a new quirk: if we want to style sections to have full-width backgrounds, we can’t use the `body { margin: 0 auto }` trick anymore so the elements in each section will be left-aligned.

So I wrote a function that loops through all direct children and wraps a `div.Center` around its children:

```js
centerSections()
function centerSections(selector = document.body) {
  // wrap all content children innerHTML with div.Center
  Array.from(selector.children).forEach(child => {
    const div = document.createElement('div')
    div.className = 'Center'
    while (child.firstChild) div.appendChild(child.firstChild)
    child.appendChild(div)
  })
}
```

Sweet. Those are the important parts.

We used [marked.js](https://marked.js.org) to render this page from a markdown file, then we added `divs` to have a centered section for each heading.

Per the hypothesis, this feels elegant to me and it loads in half a second.

## A couple more ideas

### External links

Another functional drawback of markdown is it loads all links the same way in the same window. It’s common for external links to open in a new tab, so I wrote a function that handles this:

```js
function externalizeLinks() {
  // open external links in a new tab
  document.querySelectorAll('a[href^=h]').forEach(link => {
    link.classList.add('External')
    link.target = '_blank'
  })
}
```

It also adds an `.External` class so I can add a little arrow indicator to every link it modifies [like this](https://youtu.be/dQw4w9WgXcQ).

###  Syntax highlighting

Lastly, all the code blocks are colorful. Marked will tokenize, but requires custom styles to colorize. To save time, this was accomplished with another library called [prism.js](https://prismjs.com).

Include the script:

```
<script src="https://unpkg.com/prismjs"></script>
```

And stylesheet:

```
<link href="https://unpkg.com/prismjs/themes/prism.css" rel="stylesheet">
```

Then use in the marked highlight option before rendering:

```js
marked.setOptions({
  highlight: (code, lang) => Prism.highlight(code, Prism.languages[lang || 'markup'])
})
```

I also had to move the language class from the `code` tag to the `pre` tag:

```js
function hoistCodeClasses() {
  document.querySelectorAll('pre > code').forEach(code => {
    code.parentNode.classList.add(code.className || 'language-markup')
    code.removeAttribute('class')
  })
}
```

And there you have it.

Let me know if you found this useful.

