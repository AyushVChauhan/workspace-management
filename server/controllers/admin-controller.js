const { isValidObjectId } = require('mongoose');
const workspaceModel = require('../models/workspace.model');
const { ok200 } = require('../utils/response-utils');
const { CustomError } = require('../utils/router-utils');
const amenityModel = require('../models/amenities.models');
const roomModel = require('../models/room.models');
const bookingModel = require('../models/bookings.models');

async function dashboard(req, res, next) {
	ok200(res, { count1: 100, count2: 200 });
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
	console.log(req.files);
	const image = '/uploads/' + req.files.find((ele) => ele.fieldname == 'workspaceImage').filename;
	const description = req.body.description;
	const address = req.body.address;
	const from = req.body.from;
	const to = req.body.to;
	const name = req.body.name;

	const rooms = [];
	for (let i = 0; i < req.body.rooms.length; i++) {
		rooms.push({
			label: req.body.rooms[i].label,
			image: req.files.find((ele) => ele.fieldname == 'rooms[' + i + '][image]').filename,
			price: req.body.rooms[i].price,
			description: req.body.rooms[i].description,
		});
	}

	const amenities = [];
	for (let i = 0; i < req.body.amenities.length; i++) {
		amenities.push({
			label: req.body.amenities[i].label,
			image: req.files.find((ele) => ele.fieldname == 'amenities[' + i + '][image]').filename,
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

	console.log(rooms, roomEntities, amenities, amentiesEntities);

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

module.exports = {
	dashboard,
	getWorkspaces,
	getWorkspace,
	addWorkspace,
};
