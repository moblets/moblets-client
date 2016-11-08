const jwtDecode = require('jwt-decode');

module.exports = class JWT {
  static decode(token) {
    return jwtDecode(token);
  }

  static checkExpirationTime(token) {
    return jwtDecode(token).exp > Date.now() / 1000;
  }
};
