// to get userlocation base on local "undefined" is needed
const compactNumFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

// it will convert number into 1M, 5k etc and because we are using Intl api its going to be base on user local
export function formatCompactNum(num: number) {
  return compactNumFormatter.format(num);
}
