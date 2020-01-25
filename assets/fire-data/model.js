import WebToken from './webtoken.js';
import { jsonapi } from './request.js';

export class Model {

  constructor(options={ }) {
    if(!options.host) {
      throw Error('Model missing constructor parameter: host');
    }

    if(!options.uri) {
      throw Error('Model missing constructor parameter: uri');
    }

    if(!options.type) {
      throw Error('Model missing constructor parameter: type');
    }

    this._host = _.trim(options.host, '/');
    this._uri = _.trim(options.uri, '/');
    this._type = _.trim(options.type, '/');

    this.parse({ });

    if(options.id) {
      this.id = options.id;
    }

    if(options.attributes) {
      _.assignIn(this.data.attributes, options.attributes);
    }
  }

  get id() {
    return this.data.id;
  }

  set id(value) {
    this.data.id = value;
  }

  get attributes() {
    return this.data.attributes;
  }

  set attributes(attributes) {
    this.data.attributes = attributes;
  }

  get uri() {
    let uri = `${this._host}/${this._uri}/${this._type}`;

    if(this.id) {
      uri = `${uri}/${this.id}`;
    }

    return uri;
  }

  get errored() {
    return this.errors.length;
  }

  parse(json) {
    this.errors = [ ];

    if(json.errors) {
      this.errors = json.errors;
    } else {
      this.data = json.data || {
        id: null,
        type: this._type,
        attributes: { }
      };
    }
  }

  async load(options) {
    if(!this.id) {
      console.error("sugar-data: Tried to load a model without an ID.");
      return this;
    }

    if(options) {
      if(options.fields) {
        options.fields = JSON.stringify(options.fields);
      }
    }

    let json = await jsonapi(this.uri, {
      method: 'GET',
      params: options
    });

    this.parse(json)

    return this;
  }

  async save() {
    let method = null;

    if(this.id) {
      method = 'PATCH';
    } else {
      method = 'POST';
    }

    let json = await jsonapi(this.uri, {
      method: method,
      body: { data: this.data }
    });

    this.parse(json)

    return this;
  }

  async delete() {
    if(!this.id) {
      console.error("sugar-data: Tried to delete a module without an ID.");
      return this;
    }

    let json = await jsonapi(this.uri, {
      method: 'DELETE'
    });

    this.parse(json)

    return this;
  }

  empty() {
    this.parse({
      data: {
        id: this.id,
        type: this._type,
        attributes: { }
      }
    });
  }

  clear() {
    this.parse({
      data: {
        type: this._type,
        attributes: { }
      }
    });
  }

}
