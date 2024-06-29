const { default: mongoose } = require('mongoose');

const roomSchema = new mongoose.Schema(
	{
		label: { type: String, trim: true, required: true },
		workspace_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'workspaces' },
		image: { type: String, trim: true, required: true },
		price: { type: Number, required: true },
		is_active: { type: Number, default: 1 },
		description: { type: String, trim: true, required: true },
		rating: Number,
	},
	{ timestamps: true }
);

const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel;
