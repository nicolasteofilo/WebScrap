const cheerio = require("cheerio");
const fetch = require("node-fetch");
const cnn = "https://lite.cnn.com/en";
const sendMail = require("./sendEmail")
const string = "Trump";


function getFromCNN(resp) {
  fetch(cnn)
    .then((res) => res.text())
    .then((html) => {
      resp(html);
      // resp(VideoTitles)
    })
    .catch((err) => {
      console.log(err);
    });
}

function getLatestHeadline(data) {
  const $ = cheerio.load(data);
  let VideoTitles = [];
  $("ul")
    .children("li")
    .each(function (i, el) {
      VideoTitles.push({
        title: $(el).text(),
        link: $(el).children("a").attr("href"),
      });
    });
  return VideoTitles[0];
}

function compare() {
  getFromCNN((data) => {
    let previousHeadline = getLatestHeadline(data);
    setTimeout(() => {
      getFromCNN((data) => {
        let newestHeadline = getLatestHeadline(data);
        if (newestHeadline.title !== previousHeadline.title) {
          sendMail(
            `${string} article released`,
            `${newestHeadline.title}`,
            `${newestHeadline.link}`,
            url
          );
          console.log("New article found!");
          if (newestHeadline.title.includes("Trump")) {
            console.log("Trump related article. Sending email");
          }
        }
      });
    }, 10 * 1000);
  });
}

setInterval(() => {
  compare();
}, 10 * 1000);
