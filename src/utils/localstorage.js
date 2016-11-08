module.exports = class LocalStorage {
  static save(key, data) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  static get(key) {
    if (typeof (Storage) !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    }
    return false;
  }
};
