import WebToken from './webtoken.js';
import { urlencode } from './urlencode.js';

let content_type = 'application/vnd.api+json';

export async function jsonapi(uri, options) {

  if(!options) {
    options = { };
  }

  if(!options.method) {
    options.method = 'GET';
  }

  if(!options.headers) {
    options.headers = { };
  }

  _.assignIn(options.headers, {
    'Content-Type': content_type,
    'Accept': content_type
  });

  if(WebToken.token) {
    _.assignIn(options.headers, {
      'Authorization': `Bearer ${WebToken.token}`
    })
  }

  if(options.body) {
    options.body = JSON.stringify(options.body);
  }

  if(options.params) {
    uri += urlencode(options.params);
  }

  let response = await fetch(uri, options);

  return await response.json();

}
