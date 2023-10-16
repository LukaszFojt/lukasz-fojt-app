const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const bookingSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Place',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date, 
    required: true,
  },
  checkOut: {
    type: Date, 
    required: true,
  },
  name: {
    type: String, 
    required: true,
  },
  phone: String,
  price: Number,
});

const BookingModel = model('Booking', bookingSchema);

module.exports = BookingModel;