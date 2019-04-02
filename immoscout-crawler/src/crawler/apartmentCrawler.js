const sprintf = require('sprintf-js').sprintf;
const { sites, crawler } = require('../config/config');
const initCrawler = require('./initCrawler');

const apartmentParser = require('./apartmentParser');
const insertApartments = require('../db/insertApartments');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

const siteCrawler = async (site, page) => {
  let pageUrl;
  let apartmentCount = 0;
  if (site.pages) {
    for (let i = 1; i <= site.pages; i++) {
      if (i === 1) {
        pageUrl = sprintf(site.url, '');
      } else {
        pageUrl = sprintf(site.url, `P-${i}/`);
      }

      try {
        await page.goto(pageUrl, { waitUntil: ['domcontentloaded'] });
        await page.waitForSelector('#resultListItems .result-list__listing', { visible: true });
        const resultList = await page.$$('#resultListItems .result-list__listing');
        const getApartments = async () => await Promise.all(resultList.map(apartment => apartmentParser(apartment)));
        const apartments = (await getApartments()).filter(el => el.price > 0);
        insertApartments(apartments, site.region);
        apartmentCount = apartmentCount + apartments.length;
        const randomDelay = Math.floor((Math.random() * (crawler.delays.max - crawler.delays.min)) + crawler.delays.min);
        await sleep(randomDelay);
      } catch (e) {
        console.log(site.region, ', page: ', i, ' failed. ', e)
      }
    }
    console.log('Found ', apartmentCount, ' apartments in ', site.region);
  }
};

module.exports = async () => {
  for (const site of sites) {
    const { page, browser } = await initCrawler();
    await siteCrawler(site, page);
    await browser.close();
  }
};
