# grep-requests

`grep-requests` lets you specify a URL and ask "which request did a certain
piece of data come from" when that page is loaded by Chrome. This is useful
for discovering API's with Chrome Headless.


### Usage

``` sh
grep-request "some data" "http://example.com"
```


### How it works

It intercepts Chrome's request responses using Puppetteer and then searches them.
