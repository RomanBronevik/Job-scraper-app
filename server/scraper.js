const puppeteer = require("puppeteer");
const blocker = require("./blocker");

const scrapeFunc = async (job, city, sort) => {

// Scraping Indeed
  const indeedFunc = async () => {
    const indeedBrowser = await puppeteer.launch({ 
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      headless: true, defaultViewport: null });
    try {
      const indeedPage = await indeedBrowser.newPage();

      blocker.blockFunc(indeedPage)
      let url;
      if(sort === "relevance") url = `https://www.indeed.co.uk/jobs?q=${job}&l=${city}`
      if(sort === "date") url = `https://www.indeed.co.uk/jobs?q=${job}&l=${city}&sort=date`

      await indeedPage.goto(url);
      await indeedPage.waitForSelector("tbody[id='resultsBodyContent']")

      const indeedData = await indeedPage.evaluate(() => {
        if(document.querySelectorAll("div.title").length === 0) {
          return [{noData: "No results found"}]
        }
        
        const titleNodeList = document.querySelectorAll("div.title")
        const company = document.querySelectorAll("span.company")
        const location = document.querySelectorAll(".location")
        const salary = document.querySelectorAll("div.sjcl")
        const date = document.querySelectorAll("span.date")
        const indeedArray = [];
        for(let i = 0; i < titleNodeList.length; i++) {
          indeedArray.push({
            title: titleNodeList[i].innerText,
            link: titleNodeList[i].children[0].href,
            company: company[i].innerText,
            location: location[i].innerText,
            salary: salary[i].nextElementSibling.className.includes("salarySnippet") && salary[i].nextElementSibling.innerText,
            date: date[i].innerText
          })
        }
        return indeedArray;
      })
      await indeedBrowser.close();
      return {Indeed: indeedData};
    } catch (err) {
      console.log(err);
      await indeedBrowser.close();
    }
  };
  

// Scraping Totaljobs
  const totaljobsFunc = async () => {
    const totaljobsBrowser = await puppeteer.launch({ 
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      headless: true, defaultViewport: null });
    try {
      const totaljobsPage = await totaljobsBrowser.newPage();

      blocker.blockFunc(totaljobsPage)
      let url;
      if(sort === "relevance") url = `https://www.totaljobs.com/jobs/${job}/in-${city}?radius=10`
      if(sort === "date") url = `https://www.totaljobs.com/jobs/${job}/in-${city}?radius=10&Sort=2`

      await totaljobsPage.goto(url);
      await totaljobsPage.waitForSelector("div.job-results-row");

      const totaljobsData = await totaljobsPage.evaluate(() => {
        if(document.querySelectorAll("div.job-title:not(.ci-job-title)").length === 0) {
          return [{noData: "No results found"}]
        }
        
        const titleNodeList = document.querySelectorAll("div.job-title:not(.ci-job-title)")
        const company = document.querySelectorAll("li.company")
        const description = document.querySelectorAll("ul.header-list")
        const date = document.querySelectorAll("li.date-posted")
        const totaljobsArray = [];
        for(let i = 0; i < 20; i++) {
          totaljobsArray.push({
            title: titleNodeList[i].innerText,
            link: titleNodeList[i].children[0].href,
            company: company[i].innerText,
            location: description[i].children[0].children[0].innerText,
            salary: description[i].children[1].innerText,
            date: date[i].innerText
          })
        }
        return totaljobsArray;
      })
      await totaljobsBrowser.close();
      return {Totaljobs: totaljobsData};
    } catch (err) {
      console.log(err);
      await totaljobsBrowser.close();
    }
  };
  

// Scraping Reed
  const reedFunc = async () => {
    const reedBrowser = await puppeteer.launch({ 
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      headless: true, defaultViewport: null });
    try {
      const reedPage = await reedBrowser.newPage();

      blocker.blockFunc(reedPage)
      let url;
      if(sort === "relevance") url = `https://www.reed.co.uk/jobs/${job}-jobs-in-${city}`
      if(sort === "date") url = `https://www.reed.co.uk/jobs/${job}-jobs-in-${city}?sortby=DisplayDate`

      await reedPage.goto(url);
      await reedPage.waitForSelector("div[id='content']");

      const reedData = await reedPage.evaluate(() => {
        if(document.querySelectorAll("article.job-result:not(.sponsored-job)").length === 0) {
          return [{noData: "No results found"}]
        }

        const titleNodeList = document.querySelectorAll("article.job-result:not(.sponsored-job)");
        const reedArray = [];
        for (let i = 0; i < titleNodeList.length; i++) {
          reedArray.push({
            title: titleNodeList[i].children[2].children[0].children[1].innerText,
            link: titleNodeList[i].children[2].children[0].children[1].children[0].href,
            company: titleNodeList[i].children[2].children[0].children[2].children[0].innerText,
            location: titleNodeList[i].children[2].children[1].children[1].innerText,
            salary: titleNodeList[i].children[2].children[1].children[0].children[0].innerText,
            date: titleNodeList[i].children[2].children[0].children[2].innerText
          });
        }
        return reedArray;
      });
      await reedBrowser.close();
      return {Reed: reedData};
    } catch (err) {
      console.log(err);
      await reedBrowser.close();
    }
  };

  const results = await Promise.all([
    indeedFunc(),
    totaljobsFunc(),
    reedFunc()
  ])
  return results;
  // console.log(results);
}

// scrapeFunc("retail", "london", "relevance")

module.exports = {
  scrapeFunc
}