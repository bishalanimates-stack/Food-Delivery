const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String, // Kept simple since specific user model not required in prompt
    required: true,
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
