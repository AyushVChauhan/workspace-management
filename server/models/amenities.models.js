const { default: mongoose } = require('mongoose');

const amenitySchema = new mongoose.Schema(
	{
		label: { type: String, trim: true, required: true },
		workspace_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'workspaces' },
		image: { type: String, trim: true, required: true },
		price: { type: Number, required: true },
		is_active: { type: Number, default: 1 },

		rating: Number,
	},
	{ timestamps: true }
);

const amenityModel = mongoose.model('amenities', amenitySchema);
module.exports = amenityModel;
