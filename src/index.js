const Database = require('./database/database');
const Authentication = require('./authentication/authentication');
const User = require('./user/user');

const MobletsClient = class MobletsClient {
  constructor(config) {
    this.user = new User(config);
    this.database = new Database(config);
    this.auth = new Authentication(config);
  }
};

module.exports = MobletsClient;
