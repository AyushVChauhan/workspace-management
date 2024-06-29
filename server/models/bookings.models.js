const { default: mongoose } = require('mongoose');

const bookingSchema = new mongoose.Schema(
	{
		user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
		workspace_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'workspaces' },
		room_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'rooms' },
		amenities: [{ id: { type: mongoose.SchemaTypes.ObjectId, ref: 'amenities' }, quantity: Number }],
		timing: { from: Number, to: Number },
		date: Date,
		payment_id: String,
		payment_status: { type: String },
		amount: Number,
		is_active: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const bookingModel = mongoose.model('bookings', bookingSchema);
module.exports = bookingModel;
