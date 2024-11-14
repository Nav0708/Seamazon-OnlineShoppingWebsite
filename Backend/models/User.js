const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String},
  firstName: { type: String},
  lastName: { type: String},
  address: { type: String },
  mobileNumber: { type: String},
  role: { type: String, required: true, enum: ['user', 'admin'] },
});

/*userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
*/
const User = mongoose.model('User', userSchema);

module.exports = User;
