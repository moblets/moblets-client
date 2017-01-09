const request = require('request');
const LocalStorage = require('../utils/localstorage');
const jwtDecode = require('jwt-decode');

/** Authentication manipulation */
const Authentication = class Authentication {
  /**
   * Constructor
   * @param {Object} config - Config object.
   * @param {string} config.environment - App environment.
   * @param {string} config.app - App id.
   */
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

  /**
   * Create new user with email and password
   * @param {string} email - User email.
   * @param {number} password - User password.
   * @param {string} name - User name.
   * @return {Promise} p.
   */
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
              expirationTime: new Date(jwtDecode(data.access_token).exp * 1000),
            },
          };
          LocalStorage.save(`fabapp:authUser:${this.config.app}`, authUser);
          resolve(data);
        }
      });
    });
  }

  /**
   * Sign in the user with facebook
   * @param {string} facebookUserAccessToken - Facebook user access token.
   * @return {Promise} p.
   */
  signInWithFacebook(facebookUserAccessToken) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/v1/app/${this.config.app}/facebook`;
      const form = {
        client_id: this.config.clientId,
        access_token: facebookUserAccessToken,
      };
      request.post(url, { form }, (error, response, body) => {
        const data = JSON.parse(body);
        if (error) {
          reject(error);
        } else if (response.statusCode !== 201 && response.statusCode !== 200) {
          reject(data);
        } else {
          const authUser = {
            uid: data.user.id,
            name: data.user.name,
            email: data.user.email,
            tokenManager: {
              refreshToken: data.refresh_token,
              accessToken: data.access_token,
              expirationTime: new Date(jwtDecode(data.access_token).exp * 1000),
            },
          };
          LocalStorage.save(`fabapp:authUser:${this.config.app}`, authUser);
          resolve(data);
        }
      });
    });
  }

  /**
   * Sign in the user with email and password
   * @param {string} email - User email.
   * @param {number} password - User password.
   * @return {Promise} p.
   */
  signWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/v1/app/${this.config.app}/login`;
      const form = {
        client_id: this.config.clientId,
        email,
        password,
      };
      request.post(url, { form }, (error, response, body) => {
        const data = JSON.parse(body);
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(data);
        } else {
          const authUser = {
            uid: data.user.id,
            name: data.user.name,
            email: data.user.email,
            tokenManager: {
              refreshToken: data.refresh_token,
              accessToken: data.access_token,
              expirationTime: new Date(jwtDecode(data.access_token).exp * 1000),
            },
          };
          LocalStorage.save(`fabapp:authUser:${this.config.app}`, authUser);
          resolve(data);
        }
      });
    });
  }

  /**
   * Log out the user
   * @return {Promise} p.
   */
  signOut() {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/v1/app/${this.config.app}/logout`;
      const user = LocalStorage.get(`fabapp:authUser:${this.config.app}`);
      const form = {
        email: user.email,
      };
      const headers = {
        Authorization: `Bearer ${user.tokenManager.accessToken}`,
      };
      request.post(url, { form }, { headers }, (error, response, body) => {
        const data = JSON.parse(body);
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(data);
        } else {
          LocalStorage.save(`fabapp:authUser:${this.config.app}`, '');
          resolve(data);
        }
      });
    });
  }
};

module.exports = Authentication;
