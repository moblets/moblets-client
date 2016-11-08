const Database = require('./database/database');
const Authentication = require('./authentication/authentication');
const User = require('./user/user');

module.exports = class Fabrica {
  constructor(config) {
    this.db = new Database(config);
    this.auth = new Authentication(config);
    this.user = new User(config);
  }
};

/**

const config = {
  clientKey: clientKey,
  app: app,
  environment: 'local/dev/production'
}

*/
