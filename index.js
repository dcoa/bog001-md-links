const getLinks = require('./lib/evFile.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(getLinks(path))
    } catch (e) {
      reject(e.message)
    }
  })
};

mdLinks('./README.md').then(console.log).catch(console.error)
module.exports = mdLinks;
