import { SUGAR_API } from "~/assets/settings.js";
import WebToken from "~/assets/sugar-data/webtoken.js";

export async function elasticsearch(uri="", options={ }) {
  if(uri) {
    uri = `${SUGAR_API}/v1/elasticsearch${options.index ? "/" : ""}${options.index || ""}/${uri}`;
  } else {
    uri = `${SUGAR_API}/v1/elasticsearch${options.index ? "/" : ""}${options.index || ""}`;
  }

  delete options.index;

  if(!options.headers) {
    options.headers = { };
  }

  _.assignIn(options.headers, {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  if(WebToken.authenticated) {
    _.assignIn(options.headers, {
      "Authorization": `Bearer ${WebToken.token}`
    });
  }

  if(options.body) {
    options.body = JSON.stringify(options.body);
  }

  let response = await fetch(uri, options);

  return await response.json();
}
