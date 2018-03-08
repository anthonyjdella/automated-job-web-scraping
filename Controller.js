const puppeteer = require('puppeteer');

async function openStateFarm() {
  //Make the browser visible
  const browser = await puppeteer.launch({headless: false});  
  //Make the browser headless
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://statefarm.csod.com/ats/careersite/search.aspx?site=1&c=statefarm');
  //await page.screenshot({path: 'google.png'});
  //await browser.close();
}

openStateFarm();