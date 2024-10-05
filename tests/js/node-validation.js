import * as cheerio from 'cheerio'

import { treeElements } from '../../src/tools/config.js'

const isValidElement = (node) => {
  return node.nodeType === 1
}

const isValidNode = (node) => {
  return isValidElement(node)
    ? treeElements.includes(node.tagName.toLowerCase())
    : false
}

const buildHtmlTree = (element) => {
  // Initialize an object to represent this element
  let tree = {
    tag: element.tagName.toLowerCase(),
    children: [],
  }

  // Recursively process each child element
  const children = element.children
  for (let child of children) {
    if (isValidNode(child)) {
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
