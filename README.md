# Automated Job Web Scraping Script
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
   It is a useful language for asynchronous I/O, or processing that permits other processing to continue before the transmission has finished.
  
2. **Puppeteer**

   Puppeteer is the official tool for **Chrome Headless**, a headless browser, by the Google Chrome team. Chromeheadless is the industry leader in automated testing of web applications.For more information about Puppeteer, this is a link to their documentation: [Puppeteer Docs](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

3. **File System**

   File System is an API for interacting with the file system, such as creating a document and saving it to your file system.

# Install:
```
$ npm install
$ node ScrapeStateFarm-v3.js
```

  * npm install will download all the required dependencies for this project

# Guide: 


# Output:
