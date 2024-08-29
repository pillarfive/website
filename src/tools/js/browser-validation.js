import { treeElements } from '/src/tools/config.js'
import { htmlStringToDomElement } from '/src/tools/js/utils.js'

export const parseHtmlDocumentInBrowser = () => {
  // Initialize an empty array to store the parsed elements
  const treeStructure = []

  // Get all elements in the document
  const rootElements = Array.from(document.querySelector('body').children)

  // Process each root element
  for (let element of rootElements) {
    const tree = buildHtmlTree(element)
    if (tree) {
      treeStructure.push(tree)
    }
  }

  return treeStructure
}

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

  if (element.tagName.toLowerCase() === 'img') {
    if (element.alt) {
      tree.alt = element.alt
    } else {
      tree.alt = 'No alt text'
    }
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

const generateTrees = (tree) => {
  const children = tree?.children || []
  // Base case: if there are no children, return a div with just the tag name
  if (children?.length === 0) {
    // Handle the img alt tag
    let summary = tree.tag
    if (tree.alt) {
      summary += ` (alt: ${tree.alt})`
    }
    return `<div>${summary}</div>`
  }

  // Recursive case: create a details element with a summary and nested details
  let childrenHtml = ''
  for (const child of children) {
    childrenHtml += generateTrees(child)
  }

  return `
      <details>
          <summary>${tree.tag}</summary>
          ${childrenHtml}
      </details>
  `
}

export const generateSchema = (treeStructure) => {
  let htmlOutput = ''

  // Handle the case of multiple root elements
  for (const tree of treeStructure) {
    htmlOutput += generateTrees(tree)
  }

  return htmlStringToDomElement(htmlOutput)
}
