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
   It is a useful language for asynchronous I/O, or processing that permits other processing to continue before the transmission has finished. To learn more about Node.js visit this [link] (https://nodejs.org/api/index.html).
  
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
## Project Setup
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

## Coding
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
### INSERT IMAGE
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
### INSERT IMAGE


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

To access the constants:
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

# Conclusion:

# Thanks: 

   [This guide](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e) by @emadehsan was very useful and helped me when I was stuck. View his source code [here](https://github.com/emadehsan/thal).
