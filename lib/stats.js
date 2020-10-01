const statsLinks = (links = []) => {
  let unique = new Set(links.map(el => el.href));

  let stats = [links.length, unique.size]

  if(links[0].statusCode) {

    stats.push( links.reduce((acc, cur) => {
      return cur.response === 'OK' ? acc + 0 : acc + 1;
    }, 0))
  }

  return stats;
}
module.exports = statsLinks;
