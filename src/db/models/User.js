const mongoose = require("mongoose");
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0)
  mongoose.connect(require("../connection-config.js.js")).catch(err => {
    console.error("mongoose Error", err);
  });

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

UserSchema.pre("update", function() {
  this.constructor.update(
    { _id: this._id },
    { $set: { updatedAt: Date.now() } }
  );
});

UserSchema.pre("findOneAndUpdate", function() {
  this.constructor.update(
    { _id: this._id },
    { $set: { updatedAt: Date.now() } }
  );
});

/** @name db.User */
module.exports = mongoose.model("User", UserSchema);
