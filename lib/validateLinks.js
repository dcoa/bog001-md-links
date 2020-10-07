const fetch = require('node-fetch');

const validateLinks = (arrayLinks) => {
  const validated = arrayLinks.map((link) => fetch(link.href)
    .then((resp) => {
      link.statusCode = resp.status;
      link.response = resp.statusText;

      return link;
    }).catch((error) => {
      link.statusCode = 500;
      link.response = 'FAILED';

      return link;
    }));
  return Promise.all(validated).then((resp) => resp);
};

module.exports = validateLinks;
