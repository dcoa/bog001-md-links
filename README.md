# Markdown Links

## Índice

* [1. Description](#1-description)
* [2. Install](#2-install)
* [3. Usage](#3-usage)
  * [Module](module)
  * [CLI](cli)
***

## 1. Description

md-links is a library to help you find and check the status (working/broken) of all the links in a markdown file(s).

## 2. Install


```
$ npm install -g dcoa/bog001-md-links
```

```
$ npm install dcoa/bog001-md-links
```
## 3. Usege

### Module
```js
const mdLinks = require("@dcoa/md-links");
```

The module uses a path to a markdown file or a directory as an argument, could be relative or absolute.
```js
mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

  mdLinks("./some/dir")
    .then(links => {
      // => [{ href, text, file }]
    })
    .catch(console.error);

```
Pass ``{ valitate : true }`` to know the status of the links.
```js
mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, response}]
  })
  .catch(console.error);
```
### CLI

`$ md-links <path-to-file||dir> [options]`

~~~
$ md-links ./_mockMDFile_

_mockMDFile_/_folder/links.md  https://jestjs.io/docs/en/asynchronous#resolves--rejects  Jest asynchronous code test

_mockMDFile_/_folder/links.md  https://carlosazaustre.com/manejando-la-asincronia-en-javascript/  Asincronia en js

_mockMDFile_/_folder/links.md  https://github.com/dcoa/ffff  Fake repo
~~~

#### Options
` --validate` get the server response.

~~~
 $ md-links ./_mockMDFile_  --validate

_mockMDFile_/_folder/links.md  https://jestjs.io/docs/en/asynchronous#resolves--rejects  OK  200  Jest asynchronous code test

_mockMDFile_/_folder/links.md  https://carlosazaustre.com/manejando-la-asincronia-en-javascript/  FAILED  500  Asincronia en js

_mockMDFile_/_folder/links.md  https://github.com/dcoa/ffff  Not Found  404  Fake repo
~~~
`--stats` get some extra information about the links.
~~~
$ md-links ./_mockMDFile_  --stats

Total:3
Unique:3
~~~
` --validate` `--stats`

~~~
$ md-links ./_mockMDFile_  --validate --stats

Total:3
Unique:3
Broken:2
~~~
