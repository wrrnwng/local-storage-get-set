var getStorageManager = function() {
  var obj = {};

  obj.set = function(key, value, expiry) {
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
    setTimeout(this.remove.bind(this, key), expiry * 1000);
  };

  obj.get = function(key) {
    if (window.localStorage[key] !== undefined) {
      if (JSON.parse(window.localStorage[key]) instanceof Object) {
        return JSON.parse(window.localStorage[key]);
      } else {
        return window.localStorage[key];
      }      
    } else {
      return undefined;
    }
  };

  obj.remove = function(key) {
    window.localStorage.removeItem(key);
  };

  obj.setProperty = function(key, property, value, expiry) {
    var newObj = {};
    if (this.get(key) === undefined) {
      newObj[property] = value;
      this.set(key, newObj, expiry);
    } else if (this.get(key) instanceof Object) {
      newObj = this.get(key);
      newObj[property] = value;
      this.set(key, newObj, expiry);
    } else {
      throw 'error';
    }
  };

  return obj;
};