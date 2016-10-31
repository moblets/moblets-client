const Database = require('./database/index');

module.exports = class Fabrica {
  constructor() {
    this.db = new Database();
  }
};
