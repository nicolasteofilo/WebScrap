const express = require("express");
const cheerio = require("cheerio");
const puppeter = require("puppeteer");
const axios = require("axios");

log = (msg) => {
  console.log(msg);
};

const baseURL = "https://br.investing.com/";

const app = express();

// pegando a página html
async function fetchFromYouTube() {
  const browser = await puppeter.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  const html = await page.content();
  return html;
  browser.close();
}

async function getVideos() {
  log("INICIANDO");
  const response = await axios.get("https://br.investing.com/");
  const html = response.data;
  const $ = cheerio.load(html);
  const selector = ".LeftLiContainer";

  let stocks = [];

  $(selector).each((i, element) => {
    const tr = $("td.left.bold.first.noWrap > a", element).text();
    log(tr);

    // const title = tr.children("a").text();

    // console.log(title);
    // console.log(tr);
    // const title = a.text();
    // const href = a.attr("href");

    // videos.push({
    //   trs: tr,
    // });
  });
  log("FINALIZANDO");
  return stocks;
}

getVideos();

// getVideos(fetchFromYouTube().then((response) => console.log(response)));

// app.get("/videos/:channel", (req, res) => {
//   const channelName = req.params.channel;
//   console.log(channelName);
//   fetchFromYouTube((data) => {
//     res.send(getVideos(data));
//   }, channelName);
// });

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
