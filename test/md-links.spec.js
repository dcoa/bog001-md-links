const path = require('path');
const mdLinks = require('../');
const statsLinks = require('../lib/stats.js');

describe('mdLinks', () => {

  it('should reject the promise with a message ENOENT', () => {

    const noExist = './gf.md';
    const errorMessage = "ENOENT: no such file or directory, stat 'gf.md'";

     return expect(mdLinks(noExist)).rejects.toBe(errorMessage);
  });

  it('should reject the promise with a message it is not a markdown file', () => {

    const noMd = './index.js';
    const errorMessage = "./index.js isn't a markdown file";

     return expect(mdLinks(noMd)).rejects.toBe(errorMessage);
  });

  it('should resolve the promise with array of links', () => {

    const pathAbsolute = path.resolve('./_mockMDFile_/_folder');
    const links = [
      {
        href: 'https://jestjs.io/docs/en/asynchronous#resolves--rejects',
        text: 'Jest asynchronous code test',
        path: path.join(pathAbsolute, 'links.md'),
      },
      {
        href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
        text: 'Asincronia en js',
        path: path.join(pathAbsolute, 'links.md'),
      },
      {
        href: 'https://github.com/dcoa/ffff',
        text: 'Fake repo',
        path: path.join(pathAbsolute, 'links.md'),
      },
    ];

    return expect(mdLinks(pathAbsolute)).resolves.toEqual(links);
  });

  it('should resolve the promise with array, that contain link', () => {

    const pathRelative = './_mockMDFile_/_folder/links.md';
    const link = {
      href: 'https://jestjs.io/docs/en/asynchronous#resolves--rejects',
      text: 'Jest asynchronous code test',
      path: '_mockMDFile_/_folder/links.md',
    };

    return mdLinks(pathRelative).then(data => {
      expect(data).toContainEqual(link);
    });
  });

  it('should reject the promise with a message No found links', () => {

    const noLinks = './_mockMDFile_/nolinks.md';
    const errorMessage = "No found links";

     return expect(mdLinks(noLinks)).rejects.toBe(errorMessage);
  });

  it('should resolve the promise with array, that contain link validated (OK)', () => {

    const pathRelative = './_mockMDFile_/';
    const linkValidated = {
      href: 'https://jestjs.io/docs/en/asynchronous#resolves--rejects',
      text: 'Jest asynchronous code test',
      path: '_mockMDFile_/_folder/links.md',
      statusCode: 200,
      response: 'OK'
    };

    return mdLinks(pathRelative, {validate: true}).then(data => {
      expect(data).toContainEqual(linkValidated);
    });
  });

  it('should resolve the promise with array, that contain link validated (FAILED)', () => {

    const pathRelative = './_mockMDFile_/';
    const linkValidated = {
      href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
      text: 'Asincronia en js',
      path: '_mockMDFile_/_folder/links.md',
      statusCode: 500,
      response: 'FAILED'
    };

    return mdLinks(pathRelative, {validate: true}).then(data => {
      expect(data).toContainEqual(linkValidated);
    });
  });
});

describe('statsLinks', () => {

  it('should return an array with total and unique [3, 3]', () => {

    const pathRelative = './_mockMDFile_/';
    const arrayMockLinks = [3, 3];

    return mdLinks(pathRelative).then( data => {
      const arr = statsLinks(data)

      expect(arr).toEqual(arrayMockLinks)
    });
  });

  it('should return an array with total, unique, and broken [3, 3, 2]', () => {

    const pathRelative = './_mockMDFile_/';
    const arrayMockLinks = [3, 3, 2];
    
    return mdLinks(pathRelative, { validate: true }).then( data => {
      const arr = statsLinks(data)

      expect(arr).toEqual(arrayMockLinks)
    });
  });
});
