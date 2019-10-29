const puppeteer = require('puppeteer');
const moment = require('moment');

setTimeout(function getAuth() {
  (async () => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('https://msk-proxy.dns-shop.ru:6082/php/uid.php?vsys1&rule=2&url=https://ya.ru%2f');

    await page.type('#txtUsername', 'user');
    await page.type('#txtPassword', 'pass');
  
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('#btnLogin') // Clicking the link will indirectly cause a navigation
    ]);
  
    console.log('Successfully authenticated at: ' + moment().format('MMMM Do YYYY, h:mm:ss a'));

    await browser.close();
    console.log('Headless browser is closed at: ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
    
    setTimeout(getAuth, 20000); //1800000 is a half an hour
  })();
  
}, 0); // Instantly start a script
