var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, trim: true},
  password: {type: String},
  title: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  question: {type: String, required: true, trim: true},
  choice1: {type: String, required: true, trim: true},
  votes1: {type: Number, default: 0},
  choice2: {type: String, required: true, trim: true},
  votes2: {type: Number, default: 0},
  choice3: {type: String, required: true, trim: true},
  votes3: {type: Number, default: 0},
  singlequestion: {type: String, required: true, trim: true},
  answer: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  read: {type: Number, default: 0}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;