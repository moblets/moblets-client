const request = require('request');

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

  get(user) {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/v1/app/${this.config.app}/users/${user}`;
      const headers = {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbmF1dmEubG9jYWwuZmFicmljYWRlYXBsaWNhdGl2b3MuY29tLmJyIiwiYXVkIjoiYmFzZS1pb25pYy1wcm9qZWN0IiwiZGF0YSI6IjIzMDZiM2E5ZTZlZTM0MzE1MmFiYWM4Njk2M2YwZjVkZDBlNjI0YjI4ODA3Y2ZkMzc1Njk4NmRlYWVmZDA4YmEwMDJkYTA2OGY5NGJkYWJhZTI1NzY3YmRhNzk4YTNkNjA2YmNmM2E3ZmMzMjE4NzBmYTEwNjkxN2FhOGIxNmUzMDRhM2NjZjhhYmZjYmM1OGY2NzkyMzM0MzI0ZjhmY2YiLCJpYXQiOjE0Nzg2MDU3MjUsImV4cCI6MTQ3ODYwOTMyNX0.T4dnMjZIIaR91WSvH3qKNFpvD46_n8BLsDBAWZmSBlGJyfKMerh_6LOrZJ-mK5-4KQKSVOkPYE5LNLF6G822famTGaEYL3GM_soyR5thfMl9VG0CHUTXhzQ70mW6wD_eOBPfjpBRwlFCt0xholmSabxX6Qpt1NPHz4MvDeH6HXWa8jmGIMqUOFVikq3nJzJdDPASi3VxQoqo6BZXKidvfQXjZCsfgA2CPsBv1KZZoaU0FVUMHKMgbYw7zCPJHeVYNU4aQXUzG9Kbt7f5gwGn46HTE9O15YQ5BVlJeI2PPTSfcbCtQ-FPP6TSdvOkzVpoWAg49pfGRSLuMfzc8nb0tA',
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
    });
  }
};
