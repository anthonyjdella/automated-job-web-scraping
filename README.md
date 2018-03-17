# Automated Job Web Scraping Script

![alt text](http://i2.wp.com/www.testautomationguru.com/wp-content/uploads/2017/08/header-stock.png?resize=647%2C196
 "Scrape data from a web page to a file on your computer")

Script, written in Node.js, that does some web automation and web/data scraping. The APIs used include Puppeteer and File System.

The purpose of the script is to automatically fetch job posting data from select company career websites.
For example, the script will go to a hard-coded company website and enter some filter criteria. Then it will get that data.
After getting data from the company's website, that data will be saved to a text file, in which the user can easily view new job postings.

# Notes: 
- Results may change depending on the markup. If the existing markup is changed, this script won't work and will need to be re-worked.
- This current version of the script is very specific and isn't scalable. It's specific to pre-selected job filters and companies.

# Tools:
1. **Node.js**

   Node.js is a cross-platform JavaScript environment for executing JavaScript code server-side (rather than client-side).
   It is a useful language for asynchronous I/O, or processing that permits other processing to continue before the transmission has finished. To learn more about Node.js visit this [link](https://nodejs.org/api/index.html).
  
2. **Puppeteer**

   Puppeteer is the official tool for **Chrome Headless**, a headless browser, by the Google Chrome team. Chromeheadless is the industry leader in automated testing of web applications. For more information about Puppeteer, this is a link to their documentation: [Puppeteer Docs](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

3. **File System**

   File System is an API for interacting with the file system, such as creating a document and saving it to your file system. For more information about File System, this is a link to their documentation: [FS Docs](https://nodejs.org/api/fs.html#fs_file_system)

# Install & Run:
1. Install Node.js
2. To check if it's already installed or to check the verison number (I'm on 8.10.0), type this in your console: 
```
$ node -v
```
To run this script, type these into your console:
```
$ npm install
$ node ScrapeStateFarm-v3.js
```

  * npm install will download all the required dependencies for this project (Puppeteer and File System)

# Guide: 
## Project Setup:
Create a folder on your directory that will hold all of the project files.
```
$ mkdir automated-web-scraping
$ cd automated-web-scraping
```
Automatically create a package.json file which is needed for handling dependencies and metadata.
```
$ npm init
```

To install Puppeteer and File System:
```
$ npm i --save puppeteer
$ npm install file-system --save
```
Create a main file that contains the code. Most of the code in the next section will be in this file. I saved it as ```ScrapeStateFarm-v3.js``` within the project directory that we created earlier ```automated-web-scraping```.

## Coding:
Import puppeteer and file system. We will talk about what ```constants``` is later on. 
```js
const puppeteer = require('puppeteer');
const fs = require("fs");
const constants = require("./lib/constants.js");
```
The code is written with asynchronous I/O in mind. Node.js 8 uses ```async``` and ```await``` keywords, which you will see throughout the script. ```async``` means a function returns a resolved Promise. ```await``` means wait until the Promise settles and return its result. 

This is basically how the structure works. ```Run()``` is an async function. When it finishes, the value will be passed in ```.then((value) => {```. Then you can do some other functions.

```js
async function run() {
//await
}
run().then((value) => {
});
```
Now comes the web automation part. This will automatically launch the Chrome Headless browser. Set the value to ```false``` for testing and ```true``` when your script is complete.
```js
    const browser = await puppeteer.launch({
        headless: false
    });
```
```browser.newPage()``` will open a new tab in the browser. Next, we will go to the website we are trying to scrape. In this case, we are going to State Farm's career website to look for job postings. After that, we need to enter some filters to display the jobs that we want to scrape. I only want to see "technology" jobs in Texas. To do all of this with Puppeteer, use ```.click()``` function to click on a section of the web page, use ```.keyboard.type()``` to automatically type something, use ```.waitFor()``` to wait for the page to load the results. 

Now think of the flow that you need to do this manually and code it. Go to the website -> Click on the Location Dropdown -> Select 'Texas' location -> Select the Search field -> Type 'technology' -> Search for the results -> Wait for the page to load.
![alt text](https://github.com/leeznon/automated-job-web-scraping/blob/master/screenshots/filter-jobs.png
 "Show Job Filter Results")
 
```js
    const page = await browser.newPage();
    await page.goto("https://statefarm.csod.com/ats/careersite/search.aspx?site=1&c=statefarm");
    await page.click("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl02_customFieldWrapper > button");
    await page.click("body > div > ul > li:nth-child(46) > label > span");
    await page.click("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl00_customFieldWrapper_ctl00_txtValue");
    await page.keyboard.type("technology");
    await page.click("#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_btnSearch");
    await page.waitFor(2000);
```
You might be wondering what parameters go in those functions. Most of them are selectors. These can be found by using the insepcct element in developer tools of your browser (F12).
![alt text](https://github.com/leeznon/automated-job-web-scraping/blob/master/screenshots/location-selector.png
 "Location dropdown selector in Chrome")

To make this more flexible and readable, you can store these selectors as constants in a separate file. ```constants``` is a js file in the same project directory that contains all of my constants. This is used because I can easily modify them and the code is easier to read. 

The constants are in a new file ```./lib/constants.js```. Remember to import them in ```ScrapeStateFarm-v3.js```. 
```js
module.exports = Object.freeze({

    STATE_FARM_URI : "https://statefarm.csod.com/ats/careersite/search.aspx?site=1&c=statefarm",
    STATE_FARM_LOC_DRPDWN : "#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl02_customFieldWrapper > button",
    STATE_FARM_TX_RD_BTN : "body > div > ul > li:nth-child(46) > label > span",
    STATE_FARM_SRCH_FRM : "#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_rptCustomFields_ctl00_customFieldWrapper_ctl00_txtValue",
    STATE_FARM_SRCH_TECH : "technology",
    STATE_FARM_SUBMIT_BTN : "#ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_btnSearch", 
    
});
```

To access the constants with re-written code:
```js
    const page = await browser.newPage();
    await page.goto(constants.STATE_FARM_URI);
    await page.click(constants.STATE_FARM_LOC_DRPDWN);
    await page.click(constants.STATE_FARM_TX_RD_BTN);
    await page.click(constants.STATE_FARM_SRCH_FRM);
    await page.keyboard.type(constants.STATE_FARM_SRCH_TECH);
    await page.click(constants.STATE_FARM_SUBMIT_BTN);
    await page.waitFor(2000);
```
I will need to get the job results from multiple pages (if there are many job openings). To do this, I need to find out how many pages of jobs I'm getting. I will call this function.
```js
const numPages = await getNumPages(page);
    console.log('Number of pages: ', numPages);
```

Within this async function, I need to pass ```page```. Next, I need to identify the page selector ```PAGE_CONTAINTER_SELECTOR``` that contains all of the page numbers.
![alt text](https://github.com/leeznon/automated-job-web-scraping/blob/master/screenshots/page-buttons-selector.png
 "Container selector for all the pages")

After I have that selector, I need to pass that as an argument. Notice that ```pageCount``` is the first time we've seen ```await``` keyword. ```PAGE_CONTAINTER_SELECTOR``` will be passed as ```sel``` to ```document.querySelector(sel)```.
But was just the container element, so to select each individual page button, I need to use ```pageContainer.getElementsByClassName();```. Next, loop through each page and get the number of pages. If there is no page button, return '1' because there is only 1 page. The data will be stored in ```pageCount```, then we return ```pageCount```.

```js
async function getNumPages(page) {
    const PAGE_CONTAINTER_SELECTOR = constants.STATE_FARM_PAGE_CONTAINTER_SELECTOR;
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
```
After calling ```getNumPages``` and returning the number of pages, we can loop through the pages. Then at each page, can loop through the list of job postings on the site. Take a look at how the State Farm website is. It has 1 OR multiple pages. Then a list of job postings.
![alt text](https://github.com/leeznon/automated-job-web-scraping/blob/master/screenshots/page-buttons-and-job-list.png
 "State Farm website with number of pages and jobs in a list")

Now look at the code to do the actual web scraping. Again, the outer loop is to loop through the pages and the inner loop goes through the list of job postings.
```js
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
        }
        if (numPages != 1) {
            await page.click(constants.STATE_FARM_NEXT_PAGE_SELECTOR);
            await page.waitFor(2000);
        }
    }
```

```jobListLength``` returns the number of jobs on 1 page. To do this, find the container selector of all the jobs, get each list item and count them.
```js
        let jobListLength = await page.evaluate((sel) => {
            let jobSelectorID = document.getElementById(sel);
            let jobSelectorTagName = jobSelectorID.getElementsByTagName("li");
            return jobSelectorTagName.length;
        }, JOB_SELECTOR_ID);
```

Now that we know how many jobs are on 1 page, we can loop through them. And push the results to an array.
```js
        for (let i = 1; i <= jobListLength; i++) {
            let jobSelector = LIST_JOB_SELECTOR.replace("INDEX", i)

            let jobListing = await page.evaluate((sel) => {
                return document.querySelector(sel).innerText;
            }, jobSelector);

            arrayJobResults.push(jobListing);
        }
```
We have scraped the data for 1 page, but what if there are multiple pages? We actually need to click on the next page button and scrape the next page. We use a familiar ```.click()``` function to click on the next page selector. Let's wait a little while for the next page to load.
```js
        if (numPages != 1) {
            await page.click(constants.STATE_FARM_NEXT_PAGE_SELECTOR);
            await page.waitFor(2000);
        }
```

After we have have gotten the data from all of the pages, we need to close the headless browser. And return all the results to an array.
```js
    browser.close();
    return arrayJobResults;
```

Lastly, after we have our jobs stored in the array, we will do some formatting and log it to the console. Up until now, we haven't used File System, but here it comes. ```.writeFile()``` will take our data and print it to a text file.

```js
run().then((value) => {
    let data = value.join("\r\n");
    console.log(data);
    fs.writeFile("state-farm-jobs.txt", data, function (err) {
        console.log(constants.SUCCESS_STMT);
    });
});
```
## Output:

1. What the job results look like on State Farm's website.
![alt text](https://github.com/leeznon/automated-job-web-scraping/blob/master/screenshots/browser-results.png
 "Result of State Farm jobs in web browser.")
 
 2. What the job results look like on the text file ```state-farm-jobs.txt```.
 ![alt text](https://github.com/leeznon/automated-job-web-scraping/blob/master/screenshots/txt-file-results.png
 "Result of State Farm jobs in text file.")

# Thanks: 

   [This guide](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e) by @emadehsan was very useful and helped me when I was stuck. View his source code [here](https://github.com/emadehsan/thal).
