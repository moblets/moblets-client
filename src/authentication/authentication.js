const request = require('request');
const LocalStorage = require('../utils/localstorage');

module.exports = class Authentication {
  constructor(config) {
    this.config = config;
    switch (config.environment) {
      case 'dev':
        this.url = 'http://nauva.universo2.local:8181';
        break;
      case 'production':
        this.url = 'http://nauva.universo2.local:8181';
        break;
      default:
        this.url = 'http://nauva.universo2.local:8181';
    }
  }

  createUserWithEmailAndPassword(email, password, name) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/v1/app/${this.config.app}/register`;
      const form = {
        client_id: this.config.clientId,
        email,
        password,
        name,
      };
      request.post(url, { form }, (error, response, body) => {
        const data = JSON.parse(body);
        if (error) {
          reject(error);
        } else if (response.statusCode !== 201) {
          reject(data);
        } else {
          const authUser = {
            uid: data.user.id,
            name: data.user.name,
            email: data.user.email,
            tokenManager: {
              refreshToken: data.refresh_token,
              accessToken: data.access_token,
              expirationTime: Date.now() + data.expires_in,
            },
          };
          LocalStorage.save(`fabapp:authUser:${this.config.app}`, authUser);
          resolve(data);
        }
      });
    });
  }
};
