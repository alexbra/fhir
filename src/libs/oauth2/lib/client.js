import RequestOptions from './request-options'
import Hoek from '@hapi/hoek'
import Wreck from '../../wreck'

const defaultHttpOptions = {
  json: 'strict',
  redirects: 20,
  headers: {
    Accept: 'application/json',
  },
};

export default class Client {
  constructor(config) {
    const configHttpOptions = Hoek.applyToDefaults(config.http || {}, {
      baseUrl: config.auth.tokenHost,
    });

    const httpOptions = Hoek.applyToDefaults(defaultHttpOptions, configHttpOptions);

    this.config = config;
    this.client = Wreck.defaults(httpOptions);
  }

  async request(url, params, opts) {
    const requestOptions = new RequestOptions(this.config, params);
    const options = requestOptions.toObject(opts);

    console.log('Creating request to: (POST) %s', url);
    console.log('Using request options: %j', options);

    const result = await this.client.post(url, options);

    return result.payload;
  }
};
