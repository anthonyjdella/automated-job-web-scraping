const puppeteer = require('puppeteer');
const fs = require("fs");

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
        let allJobs = []
        let listSection = document.getElementsByTagName("ul")[2];
        let allList = listSection.getElementsByTagName("li");
        for (var i=0;i<allList.length;i++){
            let eachList = listSection.getElementsByTagName("li")[i].innerText;
            allJobs.push(eachList);
        }
        return allJobs;
    });
    
    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
    fs.writeFile("state-farm-jobs.txt",value.join("\r\n"), function(err){
        console.log("'File successfully written! - Check your project directory for the state-farm-jobs.txt file");
    });
});