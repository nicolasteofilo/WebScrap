const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const download = require("download");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const log = (msg) => {
  console.log(msg);
};

const filePath = path.relative(
  process.cwd(),
  path.join(__dirname, "../complexe.pdf")
);

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  // page in browser
  const page = await browser.newPage();

  await page.goto("https://www.sodapdf.com/pt/pdf-in-html/", {
    waitUntil: "networkidle2",
  });

  const elementHandle = await page.$("input[type=file]");
  await elementHandle?.uploadFile(filePath);

  await page.waitForSelector("a.btn.btn-secondary.btn-icon", { timeout: 0 });

  const fileURL = await page.$eval("a.btn.btn-secondary.btn-icon", (el) =>
    el.getAttribute("href")
  );
  const filePathToSave = `${__dirname}/files`;

  await download(fileURL, filePathToSave);
  console.log("Download Completed");

  return await browser.close();
};

run();

app.post("/pdf-to-html", upload.single("file"), (req, res) => {
  res.json({
    message: "upload completed",
  });
});

app.listen(3333, () => {
  log("Server rodando");
});
