const Database = require('./database/index');
const Authentication = require('./authentication/index');

module.exports = class Fabrica {
  constructor(config) {
    this.db = new Database(config);
    this.auth = new Authentication(config);
  }
};

/**

const config = {
  clientKey: clientKey,
  app: app,
  environment: 'local/dev/production'
}

*/
