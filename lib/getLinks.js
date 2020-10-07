const path = require('path');
const fs = require('fs');
const marked = require('marked');

const isFolder = (route) => fs.statSync(route).isDirectory();

const getLinks = (route) => {
  // Fix type errors
  const pathFixed = path.normalize(route);
  const ext = path.extname(pathFixed);

  // recognize if the path is a directory o not exist
  if (isFolder(pathFixed)) {
    return readFolder(pathFixed);
  }

  if (ext !== '.md') {
    throw new Error(`${route} isn't a markdown file`);
  }

  return readFile(pathFixed);
};

const readFile = (route) => {
  const textmd = fs.readFileSync(route).toString();
  const linksFound = [];

  const renderer = new marked.Renderer();
  // Inline level renderer methods (link)
  renderer.link = (href, tittle, text) => {
    if (href.includes('http')) {
      linksFound.push({
        href,
        text,
        path: route,
      });
    }
  };

  marked(textmd, { renderer });
  return linksFound;
};

const readFolder = (route) => {
  const confFile = new RegExp(/(node_modules|\.[a-z])/);
  const folderFiles = fs.readdirSync(route);

  let linksFound = [];

  folderFiles.forEach((item) => {
    const file = path.join(route, item);
    const ext = path.extname(item);

    if (ext === '.md') {
      linksFound = linksFound.concat(readFile(file));
    }

    if (!confFile.test(item) && isFolder(file)) {
      linksFound = linksFound.concat(readFolder(file));
    }
  });
  return linksFound;
};

module.exports = getLinks;
