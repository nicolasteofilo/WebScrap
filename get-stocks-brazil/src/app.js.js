const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const log = require("./utils/log");

const baseUrl = "https://br.investing.com/";

const app = express();

let stocks = [];

async function getStocks() {
  const response = await axios.get(baseUrl);
  const html = response.data;
  const $ = cheerio.load(html);
  const selector = ".LeftLiContainer";

  $(selector).each((i, element) => {
    const name = $("td.left.bold.first.noWrap > a", element).text();
    const lastNum = $("td.lastNum", element).text();
    const win_or_lose = $("td.chg", element).text();
    const win_or_lose_percent = $("td.chgPer", element).text();
    log({ name, lastNum, win_or_lose, win_or_lose_percent });

    if (name && lastNum && win_or_lose && win_or_lose_percent) {
      stocks.push({
        name,
        lastNum,
        win_or_lose,
        win_or_lose_percent,
      });
    }
  });
  return stocks;
}

app.get("/stocks", async (req, res) => {
  await getStocks();
  res.json(stocks);
});

const PORT = 3333;

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});
