const { default: mongoose } = require('mongoose');

const bookingSchema = new mongoose.Schema(
	{
		user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
		workspace_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'workspaces' },
		room_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'rooms' },
		amenities: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'amenities' }],
		timing: { from: Number, to: Number },
		payment_id: String,
		payment_status: { type: String },
		is_active: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const bookingModel = mongoose.model('bookings', bookingSchema);
module.exports = bookingModel;
