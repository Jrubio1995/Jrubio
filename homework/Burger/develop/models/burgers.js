const orm = require("../config/orm.js");

const burger = {
  selectAll: function (callback) {
    orm.selectAll("burgers", function (ormRes) {
      callback(ormRes);
    });
  },

  createBurger: function (columns, values, callback) {
    orm.insertOne("burgers", columns, values, function (ormRes) {
      callback(ormRes);
    });
  },

  devourBurger: function (colValue, condition, callback) {
    orm.update("burgers", colValue, condition, function (ormRes) {
      callback(ormRes);
    });
  },
};

module.exports = burger;
