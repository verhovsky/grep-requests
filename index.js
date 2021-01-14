const puppeteer = require('puppeteer');

// TODO: filter out non-text requests and add option to disable that filtering
// TODO: option to print headers
// TODO: option to print requests in a transmittable format,
// ideally "Copy as cURL" in Chrome because that can be converted to Python
// with https://curl.trillworks.com/
// TODO: support regex
const args = process.argv.slice(2);  // node index.js
if (args.length !== 2) {
    process.exit("usage: node index.js <search string> <url to load>")
}
const [searchString, url] = args;

// TODO: add http:// or https://
new URL(url); // check that second argument can be parsed as a URL

// TODO: handle redirects, for example "wikipedia.org" fails because it
// redirects to "www.wikipedia.org"

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('response', async response => {
        response.buffer().then(file => {
            if (file.includes(searchString)) {
                // TODO: log more here
                req = response.request();
                // TODO: better formatting and flag for toggling this, because
                // the body can be obnoxiously long
                // if (req.method() === 'POST') {
                //     console.log(req.method(), req.postData(), req.url());
                // } else {
                // TODO: print where in the request the match occured too
                console.log(req.method(), req.url());
                // }
            }
        }).catch(console.error);
    });
    await page.goto(url);
    await browser.close();
})();
