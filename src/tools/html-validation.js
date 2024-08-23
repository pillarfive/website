import {
  parseHtmlDocumentInBrowser,
  generateSchema,
} from '/src/tools/js/browser-validation.js'
;(async () => {
  const treeStructure = parseHtmlDocumentInBrowser()
  const container = document.getElementById('schema')
  const schema = generateSchema(treeStructure)

  container.appendChild(schema)
})()
