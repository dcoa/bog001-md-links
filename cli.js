#!/usr/bin/env node

// that line (↑)is an instance of a shebang line and describe node like a
// interpreter to pass the file for execution
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const statsLinks = require('./lib/stats.js');
const mdLinks = require('./index.js');

const path = argv._[0];

if (!argv.validate && !argv.stats) {
  mdLinks(path)
    .then((allLinks) => {
      const strLinks = allLinks.map((link) => {
        const pathLink = chalk.blueBright(link.path);
        const text = chalk.cyan(link.text.substring(0, 49));

        return `${pathLink}  ${link.href}  ${text}
              `;
      });

      console.log(`\n${strLinks.join('\n')}\n`);
    }).catch((e) => console.log(chalk.bgRedBright(e)));
}

if (argv.validate && !argv.stats) {
  mdLinks(path, { validate: true })
    .then((allLinks) => {
      const strLinks = allLinks.map((link) => {
        const pathLink = chalk.blueBright(link.path);
        const text = chalk.cyan(link.text.substring(0, 49));

        const status = (link.response === 'OK')
          ? chalk.bgGreenBright(link.statusCode)
          : chalk.bgRedBright(link.statusCode);

        const response = (link.response === 'OK')
          ? chalk.green(link.response) : chalk.red(link.response);

        return `${pathLink}  ${link.href}  ${response}  ${status}  ${text}
              `;
      });

      console.log(`\n${strLinks.join('\n')}\n`);
    }).catch((e) => console.log(chalk.bgRedBright(e)));
}

if (!argv.validate && argv.stats) {
  mdLinks(path)
    .then((allLinks) => {
      const linkStats = statsLinks(allLinks);
      const total = chalk.bold.yellow(`Total:${linkStats[0]}`);
      const unique = chalk.bold.cyan(`Unique:${linkStats[1]}`);

      console.log(`\n${total}\n${unique}\n`);
    }).catch((e) => console.log(chalk.bgRedBright(e)));
}

if (argv.validate && argv.stats) {
  mdLinks(path, { validate: true })
    .then((allLinks) => {
      const linkStats = statsLinks(allLinks);
      const total = chalk.bold.yellow(`Total:${linkStats[0]}`);
      const unique = chalk.bold.cyan(`Unique:${linkStats[1]}`);
      const broken = chalk.bold.red(`Broken:${linkStats[2]}`);

      console.log(`\n${total}\n${unique}\n${broken}\n`);
    }).catch((e) => console.log(chalk.bgRedBright(e)));
}
