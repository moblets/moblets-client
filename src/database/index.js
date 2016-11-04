const request = require('request');

module.exports = class Database {
  constructor(config) {
    this.config = config;
  }

  get() {
    return new Promise((resolve, reject) => {
      request('http://localhost:8282/users', (error, response, body) => {
        resolve(body);
      });
    });
  }
};
