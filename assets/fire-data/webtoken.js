import { jsonapi } from './request.js';

let content_type = 'application/vnd.api+json'

class WebToken {

  constructor() {
      this.headers = {
        'Accept': content_type,
        'Content-Type': content_type
      };
      this._token = null;
      this.payload = null;
      this._interval = null;
      this.errors = [ ];
  }

  expired() {

  }

  get token() {
    return this._token;
  }

  set token(token) {
    this._token = token;
    if(token) {
      if(typeof jwt_decode === 'function') {
        this.payload = jwt_decode(this.token);
        if(this.payload.exp && this.payload.iat) {
          let difference = this.payload.exp - this.payload.iat;
          let token_checked = this.payload.iat + 1;
          let token_expiration = this.payload.iat + difference;
          if(this._interval) {
            clearInterval(this._interval);
          }
          this._interval = setInterval(() => {
            if(token_checked >= token_expiration) {
              clearInterval(this._interval);
              this._interval = null;
              this._token = null;
              this.payload = null;
              this.expired()
            } else {
              token_checked += 1;
            }
          }, 1000);
        }
      }
    } else {
      this.payload = null;
    }
  }

  get authenticated() {
    if(this.token) {
      return true;
    }
    return false;
  }

  get errored() {
    return this.errors.length;
  }

  async authenticate(uri, data) {
    if(!uri) {
      throw Error('WebToken.authenticate called without a uri.');
    }

    if(!data) {
      throw Error('WebToken.authenticate called without data.');
    }

    let json = await jsonapi(uri, {
      method: 'POST',
      body: data
    });

    if(json.errors) {
      this.token = null;
      this.errors = json.errors;
    } else {
      this.token = json.data.token;
      this.errors = [ ];
    }

    return this;
  }

  async refresh(uri) {
    if(!uri) {
      throw Error('WebToken.refresh called with a uri.');
    }

    let json = await jsonapi(uri, {
      method: 'PATCH'
    });

    if(json.errors) {
      this.token = null;
      this.errors = json.errors;
    } else {
      this.token = json.data.token;
      this.errors = [ ];
    }

    return this;
  }

  deauthenticate() {
    this.token = null;
    this.errors = [ ];
  }
}

export default (new WebToken());
