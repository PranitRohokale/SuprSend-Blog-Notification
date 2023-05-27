const mongoose = require('mongoose');

delete mongoose.connection.models['Subscriber'];

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

module.exports = Subscriber;
