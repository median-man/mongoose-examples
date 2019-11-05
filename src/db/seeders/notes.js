const mongoose = require("mongoose");
const faker = require("faker");
const db = require("../index");

const createFakeNotesForUser = user => {
  const count = Math.floor(Math.random() * 7) + 3;
  const fakeNotes = [];
  while (fakeNotes.length < count) {
    fakeNotes.push({
      title: faker.random.words(),
      body: faker.lorem.paragraph(Math.floor(Math.random() * 100) + 10),
      user: user._id
    });
  }
  return fakeNotes;
};

const flatten = (acc, arr) => acc.concat(arr);

module.exports = {
  up: async function() {
    faker.seed(1); // ensure consistent fakes
    const users = await db.User.find();
    if (!users || users.length === 0) {
      throw new Error("No users in database.");
    }
    const fakeNotes = users.map(createFakeNotesForUser).reduce(flatten, []);
    return db.Note.create(fakeNotes);
  },

  down: function() {
    return db.Note.deleteMany({});
  }
};
