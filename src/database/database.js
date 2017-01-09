const request = require('request');
const LocalStorage = require('../utils/localstorage');

/** Database manipulation */
const Database = class Database {
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
        this.url = 'http://daia.universo2.local:8282';
        break;
      case 'production':
        this.url = 'http://daia.universo2.local:8282';
        break;
      default:
        this.url = 'http://localhost:8282';
    }
  }

  /**
   * Retrieve data
   * @param {string} path - Path to the item.
   * @return {promise} p.
   */
  get(path) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/app/${this.config.app}/instances/${path}`;
      request(url, (error, response, body) => {
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
          resolve(bodyParsed);
        }
      });
    });
  }

  /**
   * Add new item
   * @param {string} path - Path to the item.
   * @param {object} data - Item data.
   * @return {promise} p.
   */
  push(path, data = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${this.url}/app/${this.config.app}/instances/${path}`,
        form: {
          data: JSON.stringify(data),
        },
        headers: {
          Authorization: `Bearer ${LocalStorage.get(`fabapp:authUser:${this.config.app}`).tokenManager.accessToken}`,
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
        } else if (response.statusCode !== 201) {
          reject(bodyParsed);
        } else {
          resolve(bodyParsed);
        }
      });
    });
  }

  /**
   * Update an existing item
   * @param {string} path - Path to the item.
   * @param {object} data - Item data.
   * @return {promise} p.
   */
  update(path, data = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${this.url}/app/${this.config.app}/instances/${path}`,
        form: {
          data: JSON.stringify(data),
        },
        headers: {
          Authorization: `Bearer ${LocalStorage.get(`fabapp:authUser:${this.config.app}`).tokenManager.accessToken}`,
        },
      };
      request.put(options, (error, response, body) => {
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
          resolve(bodyParsed);
        }
      });
    });
  }

  /**
   * Remove all data from the location
   * @param {string} path - Path to the item.
   * @return {promise} p.
   */
  remove(path) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${this.url}/app/${this.config.app}/instances/${path}`,
        headers: {
          Authorization: `Bearer ${LocalStorage.get(`fabapp:authUser:${this.config.app}`).tokenManager.accessToken}`,
        },
      };
      request.delete(options, (error, response, body) => {
        let bodyParsed;
        try {
          bodyParsed = JSON.parse(body);
        } catch (e) {
          reject(body);
        }
        if (error) {
          reject(error);
        } else if (response.statusCode !== 204) {
          reject(bodyParsed);
        } else {
          resolve();
        }
      });
    });
  }
};

module.exports = Database;
