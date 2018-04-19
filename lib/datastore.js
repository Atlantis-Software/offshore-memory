var Datastore = function() {

  var kvp = {};

  this.set = function (key, value, cb) {
    kvp[key] = value;
    cb();
  };

  this.get = function (key, cb) {
    if (!kvp[key]) {
      cb(new Error('404'));
    } else {
      cb(null, kvp[key]);
    }
  };

  this.remove = function (key, cb) {
    delete kvp[key];
    cb();
  };
};

module.exports = Datastore;
