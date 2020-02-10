import { SUGAR_API } from "~/assets/settings.js";
import WebToken from "~/assets/sugar-data/webtoken.js";

setInterval(async () => {
    if(WebToken.authenticated) {
      await WebToken.refresh(`${SUGAR_API}/v1/authentication`);
      if(WebToken.errored) {
        for(let error of WebToken.errors) {
          console.log(error);
        }
      }
    }
}, 240000);
