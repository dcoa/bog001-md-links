const statsLinks = (links = []) => {

  let unique = new Set(links.map(el => el.href));
  let stats = [links.length, unique.size]

  if(links[0].statusCode) {
    let broken = links.reduce((acc, cur) => cur.response === 'OK' ?
                  acc + 0 : acc + 1, 0);
    stats.push(broken);
  }

  return stats;
}
module.exports = statsLinks;
