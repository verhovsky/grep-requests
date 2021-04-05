const puppeteer = require('puppeteer');

// TODO: filter out non-text requests and add option to disable that filtering
// TODO: option to print headers
// TODO: option to print requests in a transmittable format,
// ideally "Copy as cURL" in Chrome because that can be converted to Python
// with https://curl.trillworks.com/
// TODO: support regex
const args = process.argv.slice(2);  // node index.js
console.log(args)
if (args.length < 1) {
    process.exit("usage: node index.js <search string> [ url to load ... ]")
}
const [searchString, ...urls] = args;

// TODO: allow leaving off http:// or https://
// check that the passed in URLs can be parsed as URLs
urls.map(url => new URL(url));

(async () => {
    // Don't waste time starting the browser if there's no URLs to check
    if (urls.length === 0) {
        return;
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Give pages a minute to load
    // TODO: make this configurable
    await page.setDefaultNavigationTimeout(60 * 1000);
    page.on('response', async response => {
        // Trying to read a redirect request's buffer raises an error
        const status = response.status();
        if ((status >= 300) && (status <= 399)) {
            return
        }

        response.buffer().then(file => {
            if (file.includes(searchString)) {
                // TODO: log more here
                req = response.request();
                // TODO: better formatting and flag for toggling this, because
                // the body can be obnoxiously long
                // if (req.method() === 'POST') {
                //     console.log(req.method(), req.postData(), req.url());
                // } else {
                // TODO: print which byte offset in the request the match occured
                // and surrounding context
                console.log(req.method(), req.url());
                // }
            }
        }).catch(console.error);
    });
    // TODO: if loading multiple URLs, group output by URL.
    for (const url of urls) {
        // TODO: make "networkidle2" configurable
        await page.goto(url, {waitUntil: 'networkidle2'});
        // TODO: sleep a second?
    }
    await browser.close();
})();
