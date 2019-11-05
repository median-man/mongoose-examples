const mongoose = require("mongoose");
const faker = require("faker");
const db = require("../index");

module.exports = {
  up: function() {
    faker.seed(1); // ensure consistent fakes
    const fakeUsers = [];
    while (fakeUsers.length < 3) {
      fakeUsers.push({
        email: faker.internet.email()
      });
    }
    return db.User.create(fakeUsers);
  },

  down: function() {
    return db.User.deleteMany({});
  }
};
