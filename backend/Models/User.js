const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password") == false) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

// validate the password with passed password
UserSchema.methods.isValidatedPassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  };
  
  //method for create & return jwt token
  UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  };
  
const User = mongoose.model('User', UserSchema);

module.exports = User;
