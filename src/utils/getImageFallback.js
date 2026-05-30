export function getImageFallback(item, type = 'default') {
  if (item?.image && item.image.trim()) return item.image;

  const placeholders = {
    race: '/placeholders/race.svg',
    shop: '/placeholders/shop.svg',
    club: '/placeholders/club.svg',
    route: '/placeholders/route.svg',
    island: '/placeholders/island.svg',
    default: '/placeholders/default.svg'
  };

  return placeholders[type] || placeholders.default;
}

export function getImageAlt(item, type = 'elemento') {
  return item?.name
    ? `${item.name} - ${type} en Trail Canarias`
    : `${type} en Trail Canarias`;
}
