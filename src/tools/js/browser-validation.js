import { sortBy } from '/src/tools/js/utils.js'
import { treeElements } from '/src/tools/config.js'

export const orderHeaders = (headers) => {
  return sortBy({
    arr: headers,
    prop: 'element',
  })
}

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
