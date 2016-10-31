const request = require('request');

module.exports = class Database {

  get() {
    return new Promise((resolve, reject) => {
      request('http://localhost:8282/users', (error, response, body) => {
        resolve(body);
      });
    });
  }
};
