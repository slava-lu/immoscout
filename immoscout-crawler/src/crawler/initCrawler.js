const puppeteer = require('puppeteer');
const { crawler } = require('../config/config');

let browser;
let page;

module.exports = async () => {
  browser = await await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const context = await browser.createIncognitoBrowserContext();
  page = await context.newPage();
  await page.setCacheEnabled(false);
  await page.setUserAgent(crawler.userAgent);
  return {page, browser};
};



