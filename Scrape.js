const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://statefarm.csod.com/ats/careersite/search.aspx?site=1&c=statefarm');
    
    //Web Scraping
    await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl02_customFieldWrapper > button');
    await page.click('body > div > ul > li:nth-child(46) > label > span');

    await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl00_customFieldWrapper_ctl00_txtValue');
    await page.keyboard.type("technology");

    await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_btnSearch');
    await page.waitFor(2000);

    const result = await page.evaluate(() => {

        let allList = document.getElementsByTagName("UL")[2];
        let allJobs = []
        let elementList = allList.getElementsByTagName("LI")[0].innerText;
        let elementList1 = allList.getElementsByTagName("LI")[1].innerText;
        let elementList2 = allList.getElementsByTagName("LI")[2].innerText;
        let elementList3 = allList.getElementsByTagName("LI")[3].innerText;
        allJobs.push(elementList,elementList1,elementList2,elementList3);
        
        return allJobs;
    });
    
    browser.close();
    return result;
};



scrape().then((value) => {
    console.log(value);
});