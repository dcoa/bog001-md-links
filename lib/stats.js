const statsLinks = (links = []) => {
  const unique = new Set(links.map((el) => el.href));
  const stats = [links.length, unique.size];

  if (links[0].statusCode) {
    const broken = links.reduce((acc, cur) => (cur.response === 'OK'
      ? acc + 0 : acc + 1), 0);
    stats.push(broken);
  }

  return stats;
};
module.exports = statsLinks;
