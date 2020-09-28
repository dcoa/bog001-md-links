const getLinks = require('./lib/getLinks.js');
const validateLinks = require('./lib/validateLinks.js');

const mdLinks = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    try {
      let links = getLinks(path).length > 0 ? getLinks(path)
      : (function(){throw new Error('No found links')}())

      if(options.validate) {
        resolve(validateLinks(links))
      }

      resolve(links)

    } catch (e) {
      reject(e.message)
    }
  })
};

mdLinks('./_mockMDFile_', {validate: true})
.then(console.log)
.catch(console.error)

module.exports = mdLinks;
