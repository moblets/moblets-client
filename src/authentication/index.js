const request = require('request');

module.exports = class Authentication {
  constructor(config) {
    this.config = config;
    switch (config.environment) {
      case 'dev':
        this.url = 'http://nauva.universo2.local:8181';
        break;
      case 'production':
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
        if (error) {
          reject(error);
        } else if (response.statusCode !== 201) {
          reject();
        } else {
          if (typeof (Storage) !== 'undefined') {
            const authUser = {
              uid: body.user.id,
              name: body.user.name,
              email: body.user.email,
              tokenManager: {
                refreshToken: body.refreshToken,
                accessToken: body.accessToken,
                expirationTime: Date.now() + body.expirationTime,
              },
            };
            localStorage.setItem(`fabapp:authUser:${this.config.app}`, authUser);
          }
          resolve(body);
        }
      });
    });
  }
};
