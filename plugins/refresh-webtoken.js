import { HOST } from "~/assets/settings.js";
import WebToken from "~/assets/fire-data/webtoken.js";

setInterval(async () => {
    if(WebToken.authenticated) {
      await WebToken.refresh(`${HOST}/v1/authentication`);
      if(WebToken.errored) {
        for(let error of WebToken.errors) {
          console.log(error);
        }
      }
    }
}, 240000);
