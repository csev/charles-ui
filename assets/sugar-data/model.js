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

    this.socket = null;

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

    if(options.realtime) {
      const uri = `ws://${_.replace(this._host, 'http://', '')}/${this._uri}/${this._type}/realtime`;

      this.socket = new WebSocket(uri);

      this.socket.addEventListener("open", (event) => {
        if(this.id) {
          this.subscribe();
        }
      });

      this.socket.addEventListener("message", async (event) => {

        let json = null;

        try {
          json = JSON.parse(event.data);
        } catch {
          throw Error(`Could not parse JSON data: ${event.data}`);
        }

        switch(json.action) {
          case "update":
            if(json.id === this.id) {
              await this.load();
            }
            break;
          case "delete":
            console.log('calling clear');
            if(json.id == this.id) {
              this.clear();
            }
            break;
        }

      });
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

  subscribe(socket=null) {
    socket = socket || this.socket;

    if(!socket) {
      throw Error("No socket available. Make the model realtime or provide a socket.");
    }

    socket.send(JSON.stringify({
      "action": "subscribe",
      "path": `/${this._uri}/${this._type}/${this.id}`
    }));
  }


  unsubscribe(socket=null) {
    socket = socket || this.socket;

    if(!socket) {
      throw Error("No socket available. Make the model realtime or provide a socket.");
    }

    socket.send(JSON.stringify({
      "action": "unsubscribe",
      "path": `/${this._uri}/${this._type}/${this.id}`
    }));
  }

  parse(json) {
    this.errors = [ ];

    if(json.errors) {
      this.errors = json.errors;
    }

    this.data = json.data || {
      id: null,
      type: this._type,
      attributes: { }
    };
  }

  async load(options) {
    if(!this.id) {
      console.error("fire-data: Tried to load a model without an ID.");
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
      console.error("fire-data: Tried to delete a module without an ID.");
      return this;
    }

    let json = await jsonapi(this.uri, {
      method: 'DELETE'
    });

    this.clear();

    return this;
  }

  empty() {
    this.parse({
      data: {
        id: this.id,
        type: this.type,
        attributes: { }
      }
    });
  }

  clear() {
    if(this.socket) {
      this.unsubscribe();
    }

    this.parse({
      data: {
        type: this.type,
        attributes: { }
      }
    });
  }

}
