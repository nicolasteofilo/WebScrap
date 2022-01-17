const express = require("express");
const cheerio = require("cheerio");
const puppeter = require("puppeteer");

const app = express();

async function fetchFromYouTube(resp, channel) {
  const browser = await puppeter.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/c/${channel}/videos`);
  resp(await page.content());
  browser.close();
}

function getVideos(data) {
  const $ = cheerio.load(data);
  const selector = "#meta";

  let videos = [];

  $(selector).each((i, element) => {
    const a = $("h3 > a", element);
    const title = a.text();
    const href = a.attr("href");

    if (title && href) {
        videos.push({
        title,
        link: `https://www.youtube.com${href}`,
        });
    }
  });

 return videos;
}

app.get('/videos/:channel', (req, res) => {
  const channelName = req.params.channel;
  console.log(channelName);
  fetchFromYouTube((data) => {
    res.send(getVideos(data));
  }, channelName);
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});