# grep-requests

`grep-requests` lets you specify a URL and ask "which request did a certain
piece of data come from" when that page is loaded by Chrome.

This is can be used for discovering if data on a given web page comes from an
API or if the server returns the HTML with the data inside.

## This is already built into Chrome

I started coding this project before realizing that you can already do this
in Chrome: open the Network tab in the Dev Tools and press Ctrl-f (instead of
clicking on the text box that says "Filter"), that search will match on
response contents as well.

### Installation

``` sh
sudo apt install node git
sudo npm install -g yarn
git clone https://github.com/verhovsky/grep-requests
cd grep-requests
yarn install
node --unhandled-rejections=strict index.js "search text" "http://example.com"
```

### Usage

``` sh
grep-requests "some data" "http://example.com"
```

#### Sample usage:

``` sh
$ node --unhandled-rejections=strict index.js "console" "https://www.wikipedia.org"
GET https://www.wikipedia.org/portal/wikipedia.org/assets/js/index-ac2f73e93a.js
```

Opening Wikipedia in Chrome fires off about 5 requests, one of which (the GET request
for the JavaScript) contains the string `"console"` in the text of its response.

### How it works

It intercepts Chrome's request responses
[using Puppeteer](https://pptr.dev/#?show=api-event-response) and then searches them.
