const Database = require('./database/database');
const Authentication = require('./authentication/authentication');
const User = require('./user/user');

const MobletsClient = class MobletsClient {
  constructor(config) {
    this.config = config;
    switch (config.environment) {
      case 'dev':
        this.config.nauva = 'http://nauva.universo2.local:8181';
        this.config.daia = 'http://daia.universo2.local:8282';
        break;
      case 'production':
        this.config.nauva = 'http://nauva.universo2.local:8181';
        this.config.daia = 'http://daia.universo2.local:8282';
        break;
      default:
        this.config.nauva = 'http://nauva.universo2.local:8181';
        this.config.daia = 'http://localhost:8282';
    }
    this.user = new User(this.config);
    this.database = new Database(this.config);
    this.auth = new Authentication(this.config);
  }
};

module.exports = MobletsClient;
