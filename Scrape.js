const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://statefarm.csod.com/ats/careersite/search.aspx?site=1&c=statefarm');
    await page.waitFor(1000);
    // Scrape
    await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl02_customFieldWrapper > button');
    await page.click('body > div > ul > li:nth-child(46) > label > span');
    await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_btnSearch');
    
    
    const result = await page.evaluate(() => {
        //getElementsByTagName should get all li elements on the page.
        //then you should iterate through all li elements
        let all = document.getElementsByTagName('li');
        console.log(all);
        for (i=0; i<all.length; i++) {
            let jobsList = [];
            jobsList.push(document.querySelector('li').innerText);
            // return something
            return {
                jobsList
            }
        }
    });
    
    //browser.close();
    return result;
};



scrape().then((value) => {
    console.log(value); // Success!
});