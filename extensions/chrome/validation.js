document.addEventListener('DOMContentLoaded', function () {
  function addError(element, message) {
    var errorMsg = document.createElement('span')
    errorMsg.classList.add('error-message')
    errorMsg.textContent = message
    element.parentNode.insertBefore(errorMsg, element.nextSibling)
  }

  function addErrorMessage(selector, message) {
    document.querySelectorAll(selector).forEach(function (element) {
      addError(element, message)
    })
  }

  // Check for <img> elements without alt tags
  addErrorMessage('img:not([alt])', 'Error: Missing alt attribute')

  // Check for empty <button> elements
  addErrorMessage('button:empty', 'Error: Empty button element')

  // Check for <button> elements where an <a> would be a better choice
  addErrorMessage(
    'button[href]',
    'Error: Use an anchor tag instead of a button'
  )

  // Check for empty or missing href
  addErrorMessage(
    'a:not([href]), a[href=""]',
    'This anchor is missing its mandatory href'
  )

  // Check for <input> elements that do not have a <label>
  document
    .querySelectorAll('input:not([type="hidden"])')
    .forEach(function (input) {
      var hasLabel = input.labels.length > 0 || input.getAttribute('aria-label')
      if (!hasLabel) {
        input.classList.add('no-label')
        var errorMsg = document.createElement('span')
        errorMsg.classList.add('error-message')
        errorMsg.textContent = 'Error: Input without label'
        input.parentNode.insertBefore(errorMsg, input.nextSibling)
      }
    })

  // Check for <button> elements that contain only non-text nodes e.g. <svg>
  function missingButtonText() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      if (button.textContent.trim().length === 0) {
        addError(button, 'This button has no text')
        button.classList.add('outline-error')
      }
    })
  }

  // Check for misused aria labels
  function brokenAriaReference(aria) {
    const complementaries = document.querySelectorAll(`[${aria}]`)
    complementaries.forEach((comp) => {
      const id = comp.getAttribute(`${aria}`)
      if (!document.getElementById(id)) {
        addError(comp, 'Broken ARIA reference')
        comp.classList.add('outline-error')
      }
    })
  }

  // Check link has valid target
  function missingLinkTargets() {
    const targets = Array.from(document.querySelectorAll('[id]')).map(
      (target) => target.id
    )
    const links = Array.from(document.querySelectorAll('a[href^="#"]'))
    links.forEach((link) => {
      const target = link.href.split('#')[1]
      if (!targets.includes(target)) {
        addError(link, 'This link has no target. How about using a button?')
        link.classList.add('outline-error')
      }
    })
  }

  // Check for invalid tabindexes
  function faultyTabIndexes() {
    const elementsWithTabIndex = Array.from(
      document.querySelectorAll('[tabindex]')
    )
    const validTabIndexValues = [0, -1]

    elementsWithTabIndex.forEach((el) => {
      if (!validTabIndexValues.includes(Number(el.tabIndex))) {
        addError(el, 'Use tabindex values of 0 or -1')
        el.classList.add('outline-error')
      }
    })
  }

  // Where there is no element, add message to body
  function addToBody(message) {
    var errorMsg = document.createElement('span')
    errorMsg.classList.add('error-message')
    errorMsg.textContent = message
    const body = document.body
    body.insertBefore(errorMsg, body.firstChild)
    errorMsg.classList.add('orphaned-error')
  }

  // Check for missing h1 header
  function missingMainTitle() {
    const h1 = document.querySelector('h1')
    if (!h1) {
      addToBody('You are missing an h1 header')
    } else if (h1.innerText.length === 0) {
      addError(h1, 'You have an empty h1 header')
    }
  }

  // Check for missing document title
  function missingDocumentTitle() {
    const title = document.title
    if (!title) {
      addToBody('You are missing a document title')
    }
  }

  // Add error where parent is invalid
  function checkForParentType(element, type) {
    const parentElement = element.parentElement
    if (!(parentElement instanceof type)) {
      addError(
        element,
        `${element.constructor.name} requires parent of type ${type.name}`
      )
      element.classList.add('outline-error')
    }
  }

  // Check for invalid parent type
  function checkForParent(tagName, parentType) {
    const elements = Array.from(document.getElementsByTagName(tagName))
    elements.forEach((el) => {
      checkForParentType(el, parentType)
    })
  }

  missingButtonText()
  brokenAriaReference('aria-labelledby')
  brokenAriaReference('aria-describedby')
  faultyTabIndexes()
  missingLinkTargets()
  missingMainTitle()
  missingDocumentTitle()
  checkForParent('dt', HTMLDListElement)
  checkForParent('dd', HTMLDListElement)
})
