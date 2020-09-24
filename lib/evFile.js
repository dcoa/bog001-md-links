const path = require('path');
const fs = require('fs');
const marked = require('marked');

const getLinks = (route) => {
  //Fix type errors
  let pathFixed = path.normalize(route);
    //recognize if the file is a markdown
    if (path.extname(pathFixed) === '.md') {
       return readFile(pathFixed);
    } //recognize if the path is a directory
    else if (fs.lstatSync(pathFixed).isDirectory()) {
      return readFolder(pathFixed);
    } else {
      throw new Error (`${route} isn't a markdown file`);
    }
};

const readFile = route => {
  const renderer = new marked.Renderer();
  let textmd = fs.readFileSync(route).toString();
  let linksFound = [];
  //Inline level renderer methods (link)
   renderer.link = (href, tittle, text) => {
     if (href.includes('http')) {
       linksFound.push({
         href,
         text,
         path: route,
       })
     }
   };
   marked(textmd, {renderer: renderer})
   return linksFound
};

const readFolder = route => fs.readdirSync(route);
//console.log(readFolder('/Users/usuario/Desktop/progbasic/Laboratoria/'));




//console.log(readFile('./README.md'))


module.exports = getLinks;
