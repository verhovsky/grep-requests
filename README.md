# grep-requests

`grep-requests` lets you specify a URL and ask "which request did a certain
piece of data come from" when that page is loaded by Chrome. This is useful
for discovering API's with Chrome Headless.


### Usage

``` sh
grep-request "some data" "http://example.com"
```

Sample session:

``` sh
$ node --unhandled-rejections=strict index.js "console" "https://www.wikipedia.org"
GET https://www.wikipedia.org/portal/wikipedia.org/assets/js/index-ac2f73e93a.js
```

opening Wikipedia in Chrome fires off about 5 requests, one of which (the GET request
for the javascript) contains the word "console" in the text of its response.

### How it works

It intercepts Chrome's request responses
[using Puppeteer](https://pptr.dev/#?show=api-event-response) and then searches them.
