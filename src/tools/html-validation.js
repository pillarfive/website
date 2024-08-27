import {
  parseHtmlDocumentInBrowser,
  generateSchema,
} from '/src/tools/js/browser-validation.js'
;(async () => {
  const treeStructure = parseHtmlDocumentInBrowser()
  const container = document.getElementsByTagName('body')[0]
  if (container) {
    const schema = generateSchema(treeStructure)

    container.appendChild(schema)
  }
})()
