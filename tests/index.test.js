import puppeteer from 'puppeteer'
import { config } from './config.js'

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()

  await page.goto('http://127.0.0.1:8080/')

  await page.setViewport({
    width: config.viewport.desktop.width,
    height: config.viewport.desktop.height,
  })

  await browser.close()
})()
