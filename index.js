const getLinks = require('./lib/getLinks.js');
const validateLinks = require('./lib/validateLinks.js');

/**
 * @param {string} path - File ubication.
 * @param {object} option - Add validate: true for check links.
 * @return {promise} resolve whith the links information
 */
const mdLinks = (path, options = {}) => new Promise((resolve, reject) => {
  try {
    const links = getLinks(path).length > 0 ? getLinks(path)
      : (function () { throw new Error('No found links'); }());

    if (options.validate) {
      resolve(validateLinks(links));
    }

    resolve(links);
  } catch (e) {
    reject(e.message);
  }
});

/* mdLinks('./', {validate: true})
.then(console.log)
.catch(console.error) */

module.exports = mdLinks;
