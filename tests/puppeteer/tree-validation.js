import puppeteer from 'puppeteer'
import { config } from '../config.js'
import { parseHtmlDocumentInNode } from '../js/validation.js'
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()

  // await page.goto(
  //   'https://www.smashingmagazine.com/2024/06/how-make-strong-case-accessibility/'
  // )
  await page.goto('http://localhost:1234/outline/eu-accessibility-act.html')

  await page.setViewport({
    width: config.viewport.desktop.width,
    height: config.viewport.desktop.height,
  })

  const html = await page.content()

  const treeStructure = parseHtmlDocumentInNode(html)

  console.dir(treeStructure, { depth: null })

  await browser.close()
})()
