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

# Install:
1. Install Node.js
2. To check if it's already installed or to check the verison number, type this in your console: 
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


# Output:

# Thanks: 

   [This guide](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e) by @emadehsan was very useful and helped me when I was stuck. View his source code [here](https://github.com/emadehsan/thal).
