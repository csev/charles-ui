export function urlencode(object) {
  let strings = [ ];
  for(let key in object) {
    strings.push(encodeURI(`${key}=${object[key]}`));
  }
  return `?${strings.join('&')}`;
}
