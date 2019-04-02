module.exports = async item => {
  let price = 0;
  let size = 0;
  let rooms = 0;
  let distance = 0;
  const id = await item.$eval('article.result-list-entry', el => el.getAttribute('data-obid'));
  const itemInfo = await item.$$eval('.font-nowrap.font-line-xs', el => el.map(e => e.innerHTML));
  if (itemInfo.length > 0) {
    try {
      price = parseInt(itemInfo.filter(el => el.includes('€'))[0].split(' ')[0].replace(/\./g, ''));
      size = parseFloat(itemInfo.filter(el => el.includes('m²'))[0].split(' ')[0].replace(',', '.'));
    } catch(e) {
      price = 0;
    }
  }
  const roomInfo = await item.$$eval('.font-nowrap.font-line-xs .onlyLarge', el => el.map(e => e.innerHTML));
  if (roomInfo.length > 0) {
    rooms = parseFloat(roomInfo[0].replace(',', '.'));
  }
  const distanceInfo = await item.$eval('.nine-tenths .float-left', el => el.innerHTML);
  if (distanceInfo && distanceInfo.includes('km')) {
    distance = parseFloat(distanceInfo.split(' ')[0]);
  }
  return {id, price, size, rooms, distance}
};
