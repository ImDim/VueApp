const {
  Schema,
  model
} = require('mongoose');


const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    ref: 'Role'
  }]
});

User.method("toJSON", function () {
  const {
    _id,
    ...object
  } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('User', User)