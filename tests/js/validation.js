import * as cheerio from 'cheerio'

import { sortBy } from './utils.js'

export const orderHeaders = (headers) => {
  return sortBy({
    arr: headers,
    prop: 'element',
  })
}

export const parseHtmlDocumentInBrowser = () => {
  // The elements we want
  const include = [
    'main',
    'header',
    'nav',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'aside',
    'footer',
  ]
  // Get all elements in the document
  const elements = document.body.getElementsByTagName('*')

  // Initialize an empty array to store the parsed elements
  const result = []

  // Loop through each element
  for (let element of elements) {
    // Check we want the element
    if (include.includes(element.tagName.toLowerCase())) {
      result.push({ element: element.tagName.toLowerCase() })
      // Check if the element has text content (ignoring whitespace)
      // const text = element.innerText
      // if (text) {
      //   // Add the element and its text content to the result array
      //   result.push({ element: element.tagName.toLowerCase(), text })
      // }
    }
  }

  return result
}

const buildHtmlTree = (element) => {
  const include = [
    'main',
    'header',
    'nav',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'aside',
    'footer',
    'p',
    'ul',
    'ol',
    'dl',
    'li',
    'dt',
    'dd',
    'table',
    'th',
    'td',
    'form',
    'legend',
    'figure',
    'img',
    'figcaption',
    'a',
  ]

  // Initialize an object to represent this element
  let tree = {
    tag: element.tagName,
    children: [],
  }

  // Recursively process each child element
  const children = element.children
  for (let child of children) {
    if (child.type === 'tag' && include.includes(child.tagName.toLowerCase())) {
      // Only process elements (ignore text, comments, etc.)
      tree.children.push(buildHtmlTree(child))
    }
  }

  if (tree.children.length === 0) {
    delete tree.children
  }

  if (tree.tag !== 'script') {
    return tree
  }
}

export const parseHtmlDocumentInNode = (html) => {
  // Load the HTML document using cheerio
  const $ = cheerio.load(html)

  // Start with the root elements (body, header, etc.)
  const rootElements = $('body').children()

  // Initialize an array to store the tree structure
  let treeStructure = []

  // Process each root element
  rootElements.each((index, element) => {
    const tree = buildHtmlTree(element)
    if (tree) {
      treeStructure.push(tree)
    }
  })

  return treeStructure
}
