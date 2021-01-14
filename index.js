const puppeteer = require('puppeteer');

const searchString = 'attachEvent';
const url = 'https://www.wikipedia.org/';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('response', async response => {
        response.buffer().then(file => {
            // console.log(response.request().url());
            // console.log(file);
            if (file.includes(searchString)) {
                console.log(response.request().url());
            }
        });
    });
    await page.goto(url);
    await browser.close();
})();
