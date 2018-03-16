# Job Web Scraping Script
Script, written in Node.js, that does some web automation and web/data scraping. The APIs used include Puppeteer and File System.

The purpose of the script is to fetch job posting data from select company career websites.
For example, the script will go to a hard-coded company website and enter some filter criteria. Then it will get that data.
After getting data from multiple company sites, that data will be aggregated. Kind of like a personal Monster.com or Glassdoor.com script.

# Notes: 
- Results may change depending on markup. If existing markup is changed, this script won't work.
- This script is very specific and isn't scalable. It's specific to pre-selected job filters and companies.


# Install:
```
$ npm install
$ node ScrapeStateFarm.js
```
*npm install will download all the required dependencies for this project
