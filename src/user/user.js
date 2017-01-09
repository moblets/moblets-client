const request = require('request');
const LocalStorage = require('../utils/localstorage');
const Jwt = require('../utils/jwt');

module.exports = class Authentication {
  constructor(config) {
    this.config = config;
    this.currentUser = LocalStorage.get(`fabapp:authUser:${this.config.app}`);
    this.jwt = new Jwt(this.config);
  }

  getUser(user) {
    return new Promise((resolve, reject) => {
      this.jwt.getAccessToken().then((accessToken) => {
        const url = `${this.config.nauva}/v1/app/${this.config.app}/users/${user}`;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        request.get(url, { headers }, (error, response, body) => {
          const data = JSON.parse(body);
          if (error) {
            reject(error);
          } else if (response.statusCode !== 200) {
            reject(data);
          } else {
            resolve(data);
          }
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
};
