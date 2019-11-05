const mongoose = require("mongoose");
const { users, notes } = require("../src/db/seeders");

users
  .down()
  .then(users.up)
  .then(results => console.log(`Added ${results.length} users`))
  .then(notes.down)
  .then(notes.up)
  .then(results => console.log(`Added ${results.length} notes`))
  .catch(console.error)
  .finally(() => mongoose.connection.close());
