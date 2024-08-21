import { parseHtmlDocumentInBrowser } from '/src/tools/js/browser-validation.js'
;(async () => {
  const treeStructure = parseHtmlDocumentInBrowser()

  console.dir(treeStructure, { depth: null })
})()
