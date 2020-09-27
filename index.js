const getLinks = require('./lib/getLinks.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      let links = getLinks(path)
      links.length > 0 ? resolve(links)
      : (function(){throw new Error('No found links')}())
    } catch (e) {
      reject(e.message)
    }
  })
};

//mdLinks('../').then(console.log).catch(console.error)
module.exports = mdLinks;
