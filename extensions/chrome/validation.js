document.addEventListener('DOMContentLoaded', function () {
  const errorClass = 'error-message'
  const outlineErrorClass = 'outline-error'

  function addError(element, message) {
    const errorMsg = document.createElement('span')
    errorMsg.classList.add(errorClass)
    errorMsg.textContent = message
    element.parentNode.insertBefore(errorMsg, element.nextSibling)
    element.classList.add(outlineErrorClass)
  }

  function addErrorMessage(selector, message) {
    document
      .querySelectorAll(selector)
      .forEach((element) => addError(element, message))
  }

  function checkElements(selector, condition, message) {
    document.querySelectorAll(selector).forEach((element) => {
      if (condition(element)) {
        addError(element, message)
      }
    })
  }

  // Accessibility checks
  const checks = [
    { selector: 'img:not([alt])', message: 'Error: Missing alt attribute' },
    { selector: 'button:empty', message: 'Error: Empty button element' },
    {
      selector: 'button[href]',
      message: 'Error: Use an anchor tag instead of a button',
    },
    {
      selector: 'a:not([href]), a[href=""]',
      message: 'This anchor is missing its mandatory href',
    },
    {
      selector: 'input:not([type="hidden"])',
      condition: (input) =>
        input.labels.length === 0 && !input.getAttribute('aria-label'),
      message: 'Error: Input without label',
    },
    {
      selector: 'button',
      condition: (button) => button.textContent.trim().length === 0,
      message: 'This button has no text',
    },
  ]

  checks.forEach((check) => {
    if (check.condition) {
      checkElements(check.selector, check.condition, check.message)
    } else {
      addErrorMessage(check.selector, check.message)
    }
  })

  function checkAriaReference(attribute) {
    checkElements(
      `[${attribute}]`,
      (element) => !document.getElementById(element.getAttribute(attribute)),
      'Broken ARIA reference'
    )
  }

  function checkLinkTargets() {
    const targets = new Set(
      Array.from(document.querySelectorAll('[id]')).map((target) => target.id)
    )
    checkElements(
      'a[href^="#"]',
      (link) => !targets.has(link.href.split('#')[1]),
      'This link has no target. How about using a button?'
    )
  }

  function checkTabIndexes() {
    checkElements(
      '[tabindex]',
      (element) => ![0, -1].includes(Number(element.tabIndex)),
      'Use tabindex values of 0 or -1'
    )
  }

  function addToBody(message) {
    const errorMsg = document.createElement('span')
    errorMsg.classList.add(errorClass, 'orphaned-error')
    errorMsg.textContent = message
    document.body.insertBefore(errorMsg, document.body.firstChild)
  }

  function checkMainTitle() {
    const h1 = document.querySelector('h1')
    if (!h1) {
      addToBody('You are missing an h1 header')
    } else if (h1.innerText.length === 0) {
      addError(h1, 'You have an empty h1 header')
    }
  }

  function checkDocumentHeadProperty(prop) {
    if (!document[prop]) {
      addToBody(`You are missing a document ${prop}`)
    }
  }

  function getHtmlLang() {
    const html = document.documentElement
    const lang = html.getAttribute('lang')
    return lang
  }

  function checkHtmlLang() {
    const lang = getHtmlLang()
    if (!lang) {
      addToBody('You are missing an HTML language property')
    }
  }

  function checkParentType(tagName, ParentType) {
    checkElements(
      tagName,
      (element) => !(element.parentElement instanceof ParentType),
      `${tagName.toUpperCase()} requires parent of type ${ParentType.name}`
    )
  }

  function getMetaContent(name) {
    const meta = document.querySelector(`meta[name="${name}"]`)
    return meta ? meta.getAttribute('content') : null
  }

  function checkMetaContent(name) {
    const meta = getMetaContent(name)
    if (!meta) {
      addToBody(`You are missing a meta ${name}`)
    }
  }

  function checkCharset() {
    const charset = document.querySelector('meta[charset]')
    if (!charset?.getAttribute('charset')) {
      addToBody('You are missing a charset')
    }
  }

  function checkMetaContentLength(minLength, maxLength) {
    // Recommended length is between 50 and 160 characters
    const description = getMetaContent('description')
    if (description.length < minLength || description.length > maxLength) {
      addToBody(
        `Your content description should be between ${minLength} and ${maxLength}`
      )
    }
  }

  function checkLangValidity() {
    // Note that this check uses a simple regular expression to validate the language code format.
    // It allows for two-letter (ISO 639-1) or three-letter (ISO 639-2) language codes,
    // optionally followed by a hyphen and a two-letter or three-letter country code.
    // Supported codes: e.g., "en", "en-US", "fr", "de-DE", etc.
    const lang = getHtmlLang()
    if (lang) {
      if (!/^[a-zA-Z]{2,3}(-[a-zA-Z]{2,3})?$/.test(lang)) {
        addToBody(`Your value for lang, ${lang}, is invalid`)
      }
    }
  }

  function checkForControlLabels(selector) {
    const inputs = Array.from(document.querySelectorAll(selector))

    inputs.forEach((input) => {
      const id = input.id || input.name
      const labels = document.querySelectorAll(`label[for="${id}"]`)
      // We target the parent because input dos not support pseudo elements.
      if (labels.length === 0) {
        addError(input, `You are missing a label for ${selector} ${id}`)
      }
    })
  }

  function checkNextElementByType(firstElement, nextElement, secondType) {
    const elements = document.querySelectorAll(firstElement)
    elements.forEach((element) => {
      const next = element[nextElement]
      if (next.constructor.name !== secondType) {
        addError(element, `You are missing an ${secondType}`)
      }
    })
  }

  function checkNextElementByTagName(element, tagName) {
    const elements = document.querySelectorAll(element)
    elements.forEach((element) => {
      if (element.tagName.toLowerCase() !== tagName) {
        addError(
          element,
          'It is kind to provide a caption for users of assistive technology.'
        )
      }
    })
  }

  // Run all checks
  checkAriaReference('aria-labelledby')
  checkAriaReference('aria-describedby')
  checkTabIndexes()
  checkLinkTargets()
  checkMainTitle()
  checkParentType('dt', HTMLDListElement)
  checkParentType('dd', HTMLDListElement)
  checkMetaContent('description')
  checkMetaContentLength(50, 160)
  checkMetaContent('viewport')
  checkDocumentHeadProperty('title')
  checkCharset()
  checkLangValidity()
  checkHtmlLang()
  checkForControlLabels('input')
  checkForControlLabels('select')
  checkNextElementByType('thead', 'firstElementChild', 'HTMLTableRowElement')
  checkNextElementByType('tbody', 'firstElementChild', 'HTMLTableRowElement')
  checkNextElementByType('table', 'firstElementChild', 'HTMLTableRowElement')
  // checkNextElementByType('table', 'firstElementChild', 'HTMLTableCaptionElement')
  checkNextElementByTagName('table', 'caption')
})
