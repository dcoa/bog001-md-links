#!/usr/bin/env node

//that line (↑)is an instance of a shebang line and describe node like a
//interpreter to pass the file for execution
const statsLinks = require('./lib/stats.js');
const mdLinks = require('./index.js');
const chalk = require('chalk');

const param = process.argv;
const url = param[2];
const validate = param.includes('--validate');
const stats = param.includes('--stats');

if (!validate && !stats) {

  mdLinks(url)
  .then(allLinks => {

    const strLinks = allLinks.map(link => {

      let path = chalk.blueBright(link.path);
      let text = chalk.cyan(link.text.substring(0,49));

      return `${path}  ${link.href}  ${text}`
    });

    console.log('\n' + strLinks.join('\n') + '\n');

  }).catch(e => console.log(chalk.bgRedBright(e)));
}

if (validate && !stats) {

  mdLinks(url, {validate: true})
  .then(allLinks => {

    const strLinks = allLinks.map(link => {

      let path = chalk.blueBright(link.path);
      let text = chalk.cyan(link.text.substring(0,49));

      let status = (link.response === 'OK')?
        chalk.bgGreenBright(link.statusCode)
        : chalk.bgRedBright(link.statusCode);

      let response = (link.response === 'OK')?
        chalk.green(link.response) : chalk.red(link.response);

      return `${path}  ${link.href}  ${response}  ${status}  ${text}`
    });

    console.log('\n' + strLinks.join('\n') + '\n');

  }).catch(e => console.log(chalk.bgRedBright(e)));
}

if (!validate && stats) {

  mdLinks(url)
  .then(allLinks => {

    let linkStats = statsLinks(allLinks);
    let total = chalk.bold.yellow('Total:' + linkStats[0]);
    let unique = chalk.bold.cyan('Unique:' + linkStats[1]);

    console.log('\n' + total + '\n'+ unique + '\n');

  }).catch(e => console.log(chalk.bgRedBright(e)));
}

if (validate && stats) {

  mdLinks(url, {validate: true})
  .then(allLinks => {
    
    let linkStats = statsLinks(allLinks);
    let total = chalk.bold.yellow('Total:' + linkStats[0]);
    let unique = chalk.bold.cyan('Unique:' + linkStats[1]);
    let broken = chalk.bold.red('Broken:' + linkStats[2]);

    console.log('\n' + total + '\n'+ unique + '\n' + broken + '\n');

  }).catch(e => console.log(chalk.bgRedBright(e)));
}
