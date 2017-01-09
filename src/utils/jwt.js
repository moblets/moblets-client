const jwtDecode = require('jwt-decode');
const LocalStorage = require('../utils/localstorage');
const request = require('request');

module.exports = class JWT {
  static decode(token) {
    return jwtDecode(token);
  }

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

  getAccessToken() {
    return new Promise((resolve, reject) => {
      let user = LocalStorage.get(`fabapp:authUser:${this.config.app}`);
      const expDate = new Date(user.tokenManager.expirationTime);
      const currentDate = new Date(Date.now());
      if (currentDate.getTime() < expDate.getTime()) {
        resolve(user.tokenManager.accessToken);
      } else {
        const options = {
          url: `${this.url}/v1/app/${this.config.app}/users/${user.uid}/access_token`,
          form: {
            client_id: this.config.clientId,
            refresh_token: user.tokenManager.refreshToken,
          },
        };
        request.post(options, (error, response, body) => {
          let bodyParsed;
          try {
            bodyParsed = JSON.parse(body);
          } catch (e) {
            reject(body);
          }
          if (error) {
            reject(error);
          } else if (response.statusCode !== 200) {
            reject(bodyParsed);
          } else {
            user.tokenManager.accessToken = bodyParsed.access_token;
            const exp = new Date(jwtDecode(user.tokenManager.accessToken).exp * 1000);
            user.tokenManager.expirationTime = exp;
            LocalStorage.save(`fabapp:authUser:${this.config.app}`, user);
            resolve(user.tokenManager.accessToken);
          }
        });
      }
    });
  }
};
