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
const SUCCESS_STMT = "File successfully written! - Check your project directory for the state-farm-jobs.txt file";

let scrape = async () => {
    //Automation
    const browser = await puppeteer.launch({
        headless: false 
    });
    const page = await browser.newPage();
    await page.goto(STATE_FARM_URI);
    //~~~~~~~~~~~~~~~~~DONT DELETE~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Comment out when testing multiple pages
    // 
    // await page.click(STATE_FARM_LOC_DRPDWN);
    // await page.click(STATE_FARM_TX_RD_BTN);
    // await page.click(STATE_FARM_SRCH_FRM);
    // await page.keyboard.type(STATE_FARM_SRCH_TECH);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    await page.click(STATE_FARM_SUBMIT_BTN);
    await page.waitFor(2000);

    //Scraping
    const result = await page.evaluate(() => {
        let allJobs = [];
        let nextPageButton = document.querySelector("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_nextPageLink");
        if (nextPageButton) {
            let listSection = document.getElementById("ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_ctl00");
            let allList = listSection.getElementsByTagName("li");
            for (var i = 0; i < allList.length; i++) {
                let eachList = listSection.getElementsByTagName("li")[i].innerText;
                allJobs.push(eachList);
            }
            return allJobs;
            // call test();
            // call nextPage();
        }
        else {
            // call test();
            let listSection = document.getElementById("ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_ctl00");
            let allList = listSection.getElementsByTagName("li");
            for (var i = 0; i < allList.length; i++) {
                let eachList = listSection.getElementsByTagName("li")[i].innerText;
                allJobs.push(eachList);
            }
            return allJobs;
        }
    });
    //------------TESTING----------------------
    const pages = await page.evaluate(() => {
        //Loop through each page
        let pageContainer = document.getElementsByClassName("results-paging")[1]; // fix this 1, similar to other issue when if empty results, it will be '1'. but non empty results, it should be '2'
        let allPages = pageContainer.getElementsByClassName("pagerLink");
        let pageCount = []
        for (let i = 0; i < allPages.length; i++) {
            let eachPage = pageContainer.getElementsByClassName("pagerLink")[i].innerHTML;
            pageCount.push(eachPage);
        }
        return pageCount;
    });
    let allResults = [];
    for (let p of pages) {
        allResults.push(result); // seems to be pushing the same result :(
        page.click("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_nextPageLink");
        page.waitFor(3000);
    }
    return allResults;
    //----------------------------------------

    //--------------THIS WORKS!!! CAN CLICK THE PAGE!!!!!!
    // await page.click("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_nextPageLink");
    
    //browser.close();
    return result;
};


//----------------------invoke this method in  "if" "else" blocks------------------
// function test (){
//     let allJobs = [];
//     let listSection = document.getElementById("ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_ctl00");
//     let allList = listSection.getElementsByTagName("li");
//     for (var i = 0; i < allList.length; i++) {
//         let eachList = listSection.getElementsByTagName("li")[i].innerText;
//         allJobs.push(eachList);
//     }
//     return allJobs;
// }

//-----------------------method to click the next page button---------------------
// let nextPage = async () => {
//     const x = await page.evaluate(() => {
//         let nextPageButton = document.querySelector("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_nextPageLink");
//         //await page.click(nextPageButton);
//     });
// };

scrape().then((value) => {
    // nextPage().then((x) => {
    // });
    let data = value.join("\r\n");
    console.log(data);
    fs.writeFile("state-farm-jobs.txt", data, function (err) {
        console.log(SUCCESS_STMT);
    });
});