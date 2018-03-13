//Import
const puppeteer = require('puppeteer');
const fs = require("fs");

//Constants
const STATE_FARM_URI = "https://statefarm.csod.com/ats/careersite/search.aspx?site=1&c=statefarm";
const STATE_FARM_LOC_DRPDWN = "#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl02_customFieldWrapper > button";
const STATE_FARM_TX_RD_BTN = "body > div > ul > li:nth-child(46) > label > span";
const STATE_FARM_SRCH_FRM = "#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl00_customFieldWrapper_ctl00_txtValue";
const STATE_FARM_SRCH_TECH = "technology";
const STATE_FARM_SUBMIT_BTN = "#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_btnSearch";

let scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(STATE_FARM_URI);
    
    //Web Scraping
    await page.click(STATE_FARM_LOC_DRPDWN);
    await page.click(STATE_FARM_TX_RD_BTN);
    await page.click(STATE_FARM_SRCH_FRM);
    await page.keyboard.type(STATE_FARM_SRCH_TECH);
    await page.click(STATE_FARM_SUBMIT_BTN);
    await page.waitFor(2000);

    const checkPages = await page.evaluate(() => {
        let pages = document.getElementsByClassName("results-paging")[2];
        let allPages = pages.getElementsByClassName("pagerLink");
            for (var j=0;j<allPages.length;j++){
                let eachPage = pages.getElementsByClassName("pagerLink")[j].innerHTML;
                if (eachPage){
                    //scrape data function
                    //result();
                    window.alert("pass");
                }
                else {
                    window.alert("Fail");
                }
            }
    });
    
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