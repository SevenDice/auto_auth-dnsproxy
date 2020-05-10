const puppeteer = require('puppeteer');
const moment = require('moment');

setTimeout(function getAuth() {
  (async () => {
    const browser = await puppeteer.launch({headless: true, ignoreHTTPSErrors: true});
    const page = await browser.newPage();
    await page.goto(''); //link

    await page.type('#user', '');
    await page.type('#passwd', '');

    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('#submit') // Clicking the link will indirectly cause a navigation
    ]);
  
    console.log('Successfully authenticated at: ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
    await browser.close();
    console.log('Headless browser is closed at: ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
    
    setTimeout(getAuth, 1800000); //1800000 is a half an hour
  })();
  
}, 0); // Instantly start a script
