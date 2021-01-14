# grep-requests

`grep-requests` is a project that lets you specify a URL and ask "which request did
a certain piece of data come from" when that page is loaded by Chrome. This is useful
for discovering API's with Chrome Headless.


### Usage

``` sh
grep-request "some data" "http://example.com"
```


### How it works

It intercepts Chrome's requests using Puppetteer and then searches them. See
https://stackoverflow.com/a/56534741
