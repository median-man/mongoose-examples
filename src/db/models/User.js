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

UserSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "user",
  justOne: false
});

UserSchema.virtual("longnote").get(function() {
  return this.get("notes").sort((a, b) => b.body.length - a.body.length)[0];
});

UserSchema.methods.longestNote = async function() {
  const notes = await mongoose.model("Note").find({ user: this._id });
  if (!notes || notes.length === 0) {
    return null;
  }
  console.log(
    notes
      .map(note => ({
        id: note._id,
        length: note.body.length
      }))
      .sort((a, b) => a.length - b.length)
  );
  return notes.sort((a, b) => b.body.length - a.body.length)[0];
};

/** @name db.User */
module.exports = mongoose.model("User", UserSchema);
