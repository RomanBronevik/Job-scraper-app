const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const scrapers = require("./scraper");

const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

// search item
app.post("/search", async (req, res) => {
  console.log(req.body.job, req.body.city, req.body.sort);
  const pageData = await scrapers.scrapeFunc(req.body.job, req.body.city, req.body.sort)
  res.send([{items: {
    Indeed: pageData[0].Indeed,
    Totaljobs: pageData[1].Totaljobs,
    Reed: pageData[2].Reed
  }}]);
  // console.log(pageData);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));