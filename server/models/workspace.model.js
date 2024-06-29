const { default: mongoose } = require('mongoose');

const workspaceSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, required: true },
		description: { type: String, trim: true, required: true },
		images: [{ type: String, trim: true }],
		rooms: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'rooms' }],
		amenities: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'amenities' }],
		timing: { from: Number, to: Number },
		is_active: { type: Number, default: 1 },
		rating: Number,
	},
	{ timestamps: true }
);

const workspaceModel = mongoose.model('workspaces', workspaceSchema);
module.exports = workspaceModel;
