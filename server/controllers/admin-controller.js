const { isValidObjectId } = require('mongoose');
const workspaceModel = require('../models/workspace.model');
const { ok200 } = require('../utils/response-utils');
const { CustomError } = require('../utils/router-utils');
const amenityModel = require('../models/amenities.models');
const roomModel = require('../models/room.models');
const bookingModel = require('../models/bookings.models');
const userModel = require('../models/users.models');
const rolesConstant = require('../constants/roles.constant');
const { uploadFile } = require('../utils/upload-utils');

async function dashboard(req, res, next) {
	const userCount = await userModel.countDocuments({ is_active: 1, role: rolesConstant.USER });
	const workspaceCount = await workspaceModel.countDocuments({ is_active: 1 });
	ok200(res, { userCount, workspaceCount });
}

async function getWorkspaces(req, res, next) {
	const workspaces = await workspaceModel.find({ is_active: 1 });
	ok200(res, workspaces);
}

async function getWorkspace(req, res, next) {
	const { id } = req.params;
	if (!isValidObjectId(id)) throw new CustomError('Bad Request', 400);

	const workspace = await workspaceModel.findOne({ _id: id, is_active: 1 }).populate('rooms').populate('amenities');
	if (!workspace) throw new CustomError('Workspace Not Found', 400);

	ok200(res, workspace);
}

async function addWorkspace(req, res, next) {
	const workspaceImageFile = req.files.find((ele) => ele.fieldname == 'workspaceImage');
	const image = await uploadFile(workspaceImageFile.path, '/uploads/' + workspaceImageFile.filename);
	const description = req.body.description;
	const address = req.body.address;
	const from = req.body.from;
	const to = req.body.to;
	const name = req.body.name;

	const rooms = [];
	for (let i = 0; i < req.body.rooms.length; i++) {
		const roomImage = req.files.find((ele) => ele.fieldname == 'rooms[' + i + '][image]');
		rooms.push({
			label: req.body.rooms[i].label,
			image: await uploadFile(roomImage.path, '/uploads/' + roomImage.filename),
			price: req.body.rooms[i].price,
			description: req.body.rooms[i].description,
		});
	}

	const amenities = [];
	for (let i = 0; i < req.body.amenities.length; i++) {
		const amenityImage = req.files.find((ele) => ele.fieldname == 'amenities[' + i + '][image]');
		amenities.push({
			label: req.body.amenities[i].label,
			image: await uploadFile(amenityImage.path, '/uploads/' + amenityImage.filename),
			price: req.body.amenities[i].price,
			quantity: req.body.amenities[i].quantity,
			description: req.body.rooms[i].description,
		});
	}

	const amentiesEntities = [];
	for (let i = 0; i < amenities.length; i++) {
		const amenity = amenities[i];
		const rating = Math.ceil(Math.random() * 5);
		amenity.rating = rating;
		amentiesEntities.push(new amenityModel(amenity));
		await amentiesEntities[i].save();
	}

	const roomEntities = [];
	for (let i = 0; i < rooms.length; i++) {
		const room = rooms[i];
		const rating = Math.ceil(Math.random() * 5);
		room.rating = rating;
		roomEntities.push(new roomModel(room));
		await roomEntities[i].save();
	}

	const rating = Math.ceil(Math.random() * 5);
	const workspace = new workspaceModel({
		address,
		amenities: amentiesEntities.map((ele) => ele._id),
		description,
		images: [image],
		name,
		rating,
		rooms: roomEntities.map((ele) => ele._id),
		timing: { from, to },
	});
	await workspace.save();

	const promises = [];

	roomEntities.forEach((ele) => {
		ele.workspace_id = workspace._id;
		promises.push(ele.save());
	});
	amentiesEntities.forEach((ele) => {
		ele.workspace_id = workspace._id;
		promises.push(ele.save());
	});

	await Promise.all(promises);

	ok200(res);
}

async function history(req, res, next) {
	const bookings = await bookingModel
		.find({ is_active: 1 })
		.populate('amenities.id')
		.populate('workspace_id')
		.populate('room_id')
		.populate('user_id')
		.lean();

	bookings.sort((a, b) => {
		let dateParts = a.date.split('/');
		let dateParts2 = b.date.split('/');
		let dateObject1 = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
		let dateObject2 = new Date(+dateParts2[2], dateParts2[1] - 1, +dateParts2[0]);
		return dateObject2 - dateObject1;
	});
	ok200(res, bookings);
}

async function roomHistory(req, res, next) {
	const { roomId } = req.params;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	const room = await roomModel.findOne({ _id: roomId }).populate('workspace_id');
	if (!room || room.workspace_id?.is_active != 1) throw new CustomError('Invalid RoomId', 400);

	const { date } = req.body;
	const dateString = new Date(date).toLocaleDateString();
	const booking = await bookingModel
		.find({ room_id: roomId, date: dateString, is_active: 1 })
		.populate('user_id')
		.populate('amenities.id');

	const response = [];

	for (let i = room.workspace_id.timing.from; i < room.workspace_id.timing.to; i++) {
		let available = true;
		let user = null;
		let amenities = [];
		booking.forEach((ele) => {
			if (available && i >= ele.timing.from && i + 1 <= ele.timing.to) {
				user = ele.user_id.username;
				amenities = ele.amenities;
				available = false;
			}
		});
		response.push({ time: { from: i, to: i + 1 }, available, user, amenities });
	}
	ok200(res, response);
}

async function getWorkspaceEdit(req, res, next) {
	const { id } = req.params;
	const workspace = await workspaceModel.findOne({ _id: id }).populate('rooms').populate('amenities').lean();
	const workspaceData = {
		id: workspace._id,
		title: workspace.name,
		from: workspace.timing.from,
		to: workspace.timing.to,
		address: workspace.address,
		description: workspace.description,
	};
	const roomData = workspace.rooms.map((ele) => ({
		label: ele.label,
		description: ele.description,
		price: ele.price,
		id: ele._id,
	}));
	const amenityData = workspace.amenities.map((ele) => ({
		name: ele.label,
		description: ele.description,
		price: ele.price,
		quantity: ele.quantity,
		id: ele._id,
	}));
	ok200(res, { workspace: workspaceData, rooms: roomData, amenities: amenityData });
}

module.exports = {
	dashboard,
	getWorkspaces,
	getWorkspace,
	addWorkspace,
	history,
	roomHistory,
	getWorkspaceEdit,
};
