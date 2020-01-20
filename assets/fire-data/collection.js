import WebToken from './webtoken.js';
import { Model } from './model.js';
import { urlencode } from './urlencode.js';
import { jsonapi } from './request.js';


export class Collection {

  constructor(options={ }) {
    if(!options.host) {
      throw Error('Collection missing constructor parameter: host');
    }

    if(!options.uri) {
      throw Error('Collection missing constructor parameter: uri');
    }

    if(!options.type) {
      throw Error('Collection missing constructor parameter: type');
    }

    this._host = _.trim(options.host, '/');
    this._uri = _.trim(options.uri, '/');
    this._type = _.trim(options.type, '/');

    this.models = [ ];
    this.offset = 0;
    this.limit = 0;
    this.total = 0;
    this.errors = [ ];
  }

  get uri() {
    return `${this._host}/${this._uri}/${this._type}`;
  }

  get errored() {
    return this.errors.length;
  }

  parse(json) {
    this.errors = [ ];

    if(json.errors) {
      this.errors = json.errors;
    } else {
      this.models = [ ];
      this.offset = 0;
      this.limit = 0;
      this.total = 0;

      _.forEach(json.data, (item) => {
        let model = new Model({
          host: this._host,
          type: this._type,
          uri: this._uri,
          id: item.id,
          attributes: item.attributes
        });
        this.models.push(model);
      });

      if(json.meta) {
        this.offset = json.meta.offset;
        this.limit = json.meta.limit;
        this.total = json.meta.total;
      }
    }
  }

  async find(options) {
    if(options) {

      if(options.query) {
        options.query = JSON.stringify(options.query);
      }

      if(options.fields) {
        options.fields = JSON.stringify(options.fields);
      }

      if(options.sort) {
        options.sort = options.sort.join(',');
      }

      if(options.page) {

        if(options.page.offset) {
          options['page[offset]'] = options.page.offset;
          delete options.page['offset'];
        }

        if(options.page.limit) {
          options['page[limit]'] = options.page.limit;
          delete options.page['limit'];
        }

        delete options['page'];

      }
    }

    let json = await jsonapi(this.uri, {
      method: 'GET',
      params: options
    });

    this.parse(json);

    return this;
  }

  clear() {
    this.parse({ data: [ ] });
  }
}
