//~~~~~~~~~OMG DONT DELETE THIS IS WORKING CODE




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



    //~~~~~~~~~~TESTING CLICK SELECTOR FOR NEXT PAGE
    //TODO
    //to go to next page, click must be on the following selector. it wont work with eachPage ('<span class="text">&nbsp;2&nbsp;</span>')
    // await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_pagingLinksRepeater_ctl01_pageSelector');
    // await page.waitFor(5000)



    //Scraping
    const result = await page.evaluate(() => {
        let pages = document.getElementsByClassName("results-paging")[2];
        let allPages = pages.getElementsByClassName("pagerLink");
        let allJobs = [];
        //Loop through each page
        for (var j = 0; j < allPages.length; j++) {
            let eachPage = pages.getElementsByClassName("pagerLink")[j].innerHTML;
            if (eachPage) {
                //Scrape jobs on single page
                let listSection = document.getElementsByTagName("ul")[2];
                let allList = listSection.getElementsByTagName("li");
                for (var i = 0; i < allList.length; i++) {
                    let eachList = listSection.getElementsByTagName("li")[i].innerText;
                    allJobs.push(eachList);


                    //~~~~~~~~~~~~~~~~~~~~~~~TODO / FIX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    //Turn the page
                    let nextPage = async () => {
                        //to go to next page, click must be on the following selector. it wont work with eachPage ('<span class="text">&nbsp;2&nbsp;</span>')
                        const nextPageResult = await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_pagingLinksRepeater_ctl01_pageSelector');
                        return nextPageResult;
                        await page.waitFor(2000);
                    };
                    nextPage().then((value) => {
                        window.alert(value);
                    });
                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    

                    //TRYING NEW THINGS FROM OTHER GUIDES
                    //let selection = await page.$$();
                    //let thing = await page.click('#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_pgrList_pagingLinksRepeater_ctl01_pageSelector');
                    

                    //INSTEAD OF LOOPING THROUGH PAGES, JUST CLICK THE NEXT PAGE BUTTON



                }
            }
            else {
                window.alert("Fail");
            }
        }
        return allJobs;
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    let data = value.join("\r\n");
    console.log(data);
    fs.writeFile("state-farm-jobs.txt", data, function (err) {
        console.log(SUCCESS_STMT);
    });
});