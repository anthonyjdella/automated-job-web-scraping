const puppeteer = require('puppeteer');
const constants = require("./lib/constants.js");
const fs = require("fs");

async function run() {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.goto('https://statefarm.csod.com/ats/careersite/search.aspx?site=1&c=statefarm');
    await page.click(constants.STATE_FARM_LOC_DRPDWN);
    await page.click(constants.STATE_FARM_TX_RD_BTN);
    await page.click(constants.STATE_FARM_SRCH_FRM);
    await page.keyboard.type(constants.STATE_FARM_SRCH_TECH);
    await page.click(constants.STATE_FARM_SUBMIT_BTN);
    await page.waitFor(2000);

    const numPages = await getNumPages(page);
    console.log('Number of pages: ', numPages);

    const LIST_JOB_SELECTOR = "#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_ctl00 > ul > li:nth-child(INDEX)";
    const JOB_SELECTOR_ID = "ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_ctl00";
    var arrayJobResults = [];

    for (let h = 1; h <= numPages; h++) {
        console.log("Page Number : " + h);
        let jobListLength = await page.evaluate((sel) => {
            let jobSelectorID = document.getElementById(sel);
            let jobSelectorTagName = jobSelectorID.getElementsByTagName("li");
            return jobSelectorTagName.length;
        }, JOB_SELECTOR_ID);

        for (let i = 1; i <= jobListLength; i++) {
            let jobSelector = LIST_JOB_SELECTOR.replace("INDEX", i)

            let jobListing = await page.evaluate((sel) => {
                return document.querySelector(sel).innerText;
            }, jobSelector);

            arrayJobResults.push(jobListing);
            //console.log(jobListing);
        }
        if (numPages != 1) {
            await page.click("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_nextPageLink");
            //-----Vanilla JS implementation--------------
            //docum.getElementById("ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_nextPageLink").click();ent
            await page.waitFor(2000);
        }
    }

    browser.close();
    return arrayJobResults;
}

async function getNumPages(page) {
    const PAGE_CONTAINTER_SELECTOR = '#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_ctl00 > div.results-paging';
    let pageCount = await page.evaluate((sel) => {
        let defaultCount = 1;
        let pageContainer = document.querySelector(sel);
        let allPages = pageContainer.getElementsByClassName("pagerLink");
        if (allPages.length > 0) {
            return allPages.length;
        }
        else {
            return defaultCount;
        }
    }, PAGE_CONTAINTER_SELECTOR);
    return pageCount;
}

//---------------This is a method to try and fix a bug, when there are more than 5 pages. This attempts to count the number of currently selected pages with the inactive pages-------------------------------------------------------------------------------------------------
//
// async function getNumPages(page) {
//
//   const ACTIVE_PAGE_CONTAINTER_SELECTOR = '#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_pagingLinksRepeater_ctl00_lblCurrentPage';
//   const NONACTIVE_PAGE_CONTAINTER_SELECTOR = '#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_pagingLinksRepeater_ctl00_pageSelector';
//
//   let activePageCount = await page.evaluate((sel) => {
//     let counter = 0;
//     let pageContainer = document.querySelector(sel);
//     for (let i=0;i<=4;i++){
//         window.alert(pageContainer)
//         let jobSelector = pageContainer.replace(/ct100/g, i); //pageContainer is a span element, it must be a string to replace the text
//         counter++;
//     }
//     return counter;
// }, ACTIVE_PAGE_CONTAINTER_SELECTOR);
//
//     let nonActivePageCount = await page.evaluate((sel) => {
//         let counter = 0;
//         for (let i=0;i<=4;i++){
//             let pageContainer = document.querySelector(sel);
//             let jobSelector = pageContainer.replace(/ct100/g, i); //pageContainer is a span element, it must be a string to replace the text
//             counter++;
//         }
//     return counter;
// }, NONACTIVE_PAGE_CONTAINTER_SELECTOR);
//     
// return [activePageCount, nonActivePageCount];
// }


run().then((value) => {
    let data = value.join("\r\n");
    console.log(data);
    fs.writeFile("state-farm-jobs.txt", data, function (err) {
        console.log(constants.SUCCESS_STMT);
    });
});