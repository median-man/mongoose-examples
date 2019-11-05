const mongoose = require("mongoose");
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0)
  mongoose.connect(require("../connection-config.js")).catch(err => {
    console.error("mongoose Error", err);
  });

const NoteSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

NoteSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

NoteSchema.pre("update", function() {
  this.constructor.update(
    { _id: this._id },
    { $set: { updatedAt: Date.now() } }
  );
});

NoteSchema.pre("findOneAndUpdate", function() {
  this.constructor.update(
    { _id: this._id },
    { $set: { updatedAt: Date.now() } }
  );
});

/** @name db.Note */
module.exports = mongoose.model("Note", NoteSchema);
