const mdLinks = require('../');
const evFile = require('../lib/evFile.js');

describe('mdLinks', () => {

  it.only('should...', () => {
    console.log(mdLinks('./README.md'));
  });

  it('should...', () => {
    expect(mdLinks('./git')).toBe('The file or directory does not exist');
  });
});

describe('evPathType', () => {

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
});


/*describe('pathExist', () => {

  it('should return true', () => {
    expect(evFile.pathExist('./README.md')).toBeTruthy();
  });
  it('should return true', () => {
    expect(evFile.pathExist('./index.js')).toBeTruthy();
  });
  it('should return false', () => {
    expect(evFile.pathExist('./log')).toBe('The file or directory does not exist');
  });
});*/
