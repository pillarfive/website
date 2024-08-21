import { parseHtmlDocumentInBrowser } from '/src/tools/js/browser-validation.js'
import { htmlStringToDomElement } from '/src/tools/js/utils.js'
;(async () => {
  const treeStructure = parseHtmlDocumentInBrowser()

  function generateTrees(tree) {
    const children = tree?.children || []
    // Base case: if there are no children, return a summary with just the tag name
    if (children?.length === 0) {
      return `<div>${tree.tag}</div>`
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

  const generateSchema = (treeStructure) => {
    let htmlOutput = ''

    // Handle the case of multiple root elements
    for (const tree of treeStructure) {
      htmlOutput += generateTrees(tree)
    }

    return htmlOutput
  }

  const schema = document.getElementById('schema')

  const nestedHtml = generateSchema(treeStructure)

  const html = htmlStringToDomElement(nestedHtml)
  schema.appendChild(html)
})()
