const mdLinks = require('../');
const getLinks = require('../lib/getLinks.js');

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

  it('should resolve the promise with array', () => {
    const pathAbsolute = '/Users/usuario/Desktop/progbasic/Laboratoria/bog001-md-links/_mockMDFile_';
    const links = [
      {
        href: 'https://jestjs.io/docs/en/asynchronous#resolves--rejects',
        text: 'Jest asynchronous code test',
        path: '/Users/usuario/Desktop/progbasic/Laboratoria/bog001-md-links/_mockMDFile_/links.md',
      },
      {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        path: '/Users/usuario/Desktop/progbasic/Laboratoria/bog001-md-links/_mockMDFile_/links.md',
      },
      {
        href: 'https://github.com/dcoa/ffff',
        text: 'Fake repo',
        path: '/Users/usuario/Desktop/progbasic/Laboratoria/bog001-md-links/_mockMDFile_/links.md',
      },
    ];
    return expect(mdLinks(pathAbsolute)).resolves.toEqual(links);
  });

  it('should resolve the promise with array, that contain link', () => {
    const pathRelative = './_mockMDFile_/links.md';
    const link = {
      href: 'https://jestjs.io/docs/en/asynchronous#resolves--rejects',
      text: 'Jest asynchronous code test',
      path: '_mockMDFile_/links.md',
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
});

/*describe('evPathType', () => {

  it('should return the path to the md file', () => {
    const absolutePath = '/Users/usuario/Desktop/progbasic/Laboratoria/bog001-md-links/README.md'
    expect(evFile.evPathType()).toBe(absolutePath);
  });
  it('should return no es', () => {
    expect(evFile.evPathType('./index.js')).toBe("We haven't identified a markdown file.");
  });
  it('should return the directory path relative to cwd', () => {
    const relativePath = './'
    expect(evFile.evPathType('./')).toBe(relativePath);
  });
});*/
