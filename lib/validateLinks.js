const http = require('http');
const https = require('https');
const httpreq = require('httpreq');
const get = require('simple-get');
const fetch = require('node-fetch');

const validateLinks = arrayLinks => {

   let validated = arrayLinks.map( link => {

     return fetch(link.href)
     .then(resp => {
         link.statusCode = resp.status;
         link.response = resp.statusText;

         return link;

     }).catch(error => {
       link.response = error.message;

       return link;
     })


    /* get(link.href, return function (err, res) {

       if(err) throw err.message;

       if(res.statusCode >= 200 && res.statusCode <= 299){
         link.statusCode = res.statusCode;
         link.valid = 'OK';
       }

       if(res.statusCode >= 400 && res.statusCode <= 499){
         link.statusCode = res.statusCode;
         link.valid = 'FAIL';
       }
       console.log(link);
       return link
     })*/
   })
   return Promise.all(validated).then(resp => resp);
}

module.exports = validateLinks;
