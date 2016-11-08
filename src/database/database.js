const request = require('request');

module.exports = class Database {
  constructor(config) {
    this.config = config;
  }

  get() {
    return new Promise((resolve, reject) => {
      request('url', (error, response, body) => {
        resolve(body);
      });
    });
  }
};
