const {
  Schema,
  model
} = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const Post = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  published: {
    type: Boolean,
  }
}, {
  timestamps: true
});

Post.plugin(mongoosePaginate);

Post.method("toJSON", function () {
  const {
    _id,
    ...object
  } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('Post', Post)