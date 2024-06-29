const { isValidObjectId, default: mongoose } = require('mongoose');
const { CustomError } = require('../utils/router-utils');
const roomModel = require('../models/room.models');
const bookingModel = require('../models/bookings.models');
const amenityModel = require('../models/amenities.models');

async function bookRoom(req, res, next) {
	//amenities = [{id:, quantity:,}]
	const { roomId, from, to, amenities, date } = req.body;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	if (to <= from) throw new CustomError('To and From Invalid', 400);

	const room = await roomModel.findOne({ _id: roomId, is_active: 1 }).populate('workspace_id');
	if (!room) throw new CustomError('Invalid RoomID');

	const startDate = new Date(date);
	startDate.setUTCHours(0, 0, 0, 0);
	const endDate = new Date(date).setUTCHours(0);
	endDate.setUTCHours(23, 59, 59, 999);
	const booking = await bookingModel.find({ room_id: roomId, is_active: 1, date: { $gt: startDate, $lt: endDate } });
	let available = true;
	booking.forEach((ele) => {
		if ((from >= ele.timing.from && from < ele.timing.to) || (to > ele.timing.from && to < ele.timing.to)) {
			available = false;
			return;
		}
	});
	if (!available) throw new CustomError('Room Not Available', 400);

	let amount = 0;
	amount += room.price * (to - from);

	for (let i = 0; i < amenities.length; i++) {
		const ele = amenities[i];
		const amenity = await amenityModel.findOne({ _id: ele.id, is_active: 1, workspace_id: room.workspace_id._id });
		if (!amenity) throw new CustomError(`Amenity ${ele.id} is invalid`);
		const booking = await bookingModel.find({
			'amenities.id': ele.id,
			is_active: 1,
			date: { $gt: startDate, $lt: endDate },
		});
		let totalAmenity = amenity.quantity;
		booking.forEach((ele) => {
			//TODO to be changed
			if (ele.timing.to < to) {
				totalAmenity--;
			}
		});
		if (ele.quantity > totalAmenity) throw new CustomError(`Amenity ${ele.id} is out of range`);
		amount += ele.quantity * amenity.price * (to - from);
	}

	const newBooking = new bookingModel({
		amenities: amenities.map((ele) => ({ ...ele, id: new mongoose.Types.ObjectId(ele.id) })),
		amount,
		date,
		is_active: 1,
		room_id: new mongoose.Types.ObjectId(roomId),
		timing: { from, to },
		user_id: new mongoose.Types.ObjectId(res.locals.userData._id),
		workspace_id: room.workspace_id._id,
	});

	await newBooking.save();

	ok200(res);
}

async function getAmenityAvailability(req, res, next) {
	const { roomId } = req.params;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	const { from, to } = req.body;
	if (to <= from) throw new CustomError('To and From Invalid', 400);

	const room = await roomModel.findOne({ _id: roomId, is_active: 1 }).populate('workspace_id');
	if (!room || room.workspace_id?.is_active != 1) throw new CustomError('Invalid RoomId', 400);

	const startDate = new Date(date);
	startDate.setUTCHours(0, 0, 0, 0);
	const endDate = new Date(date).setUTCHours(0);
	endDate.setUTCHours(23, 59, 59, 999);

	const amenities = await amenityModel.find({ workspace_id: room.workspace_id._id, is_active: 1 }).lean();
	for (let index = 0; index < amenities.length; index++) {
		const element = amenities[index];
		const booking = await bookingModel.find({
			'amenities.id': ele.id,
			is_active: 1,
			date: { $gt: startDate, $lt: endDate },
		});
		booking.forEach((ele) => {
			//TODO to be changed
			if (ele.timing.to < to) {
				element.quantity--;
			}
		});
		if (ele.quantity < 0) ele.quantity = 0;
	}
	ok200(res, amenities);
}

async function getAvailability(req, res, next) {
	const { roomId } = req.params;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	const room = await roomModel.findOne({ _id: roomId, is_active: 1 }).populate('workspace_id');
	if (!room || room.workspace_id?.is_active != 1) throw new CustomError('Invalid RoomId', 400);

	const { date } = req.body;
	const startDate = new Date(date);
	startDate.setUTCHours(0, 0, 0, 0);
	const endDate = new Date(date).setUTCHours(0);
	endDate.setUTCHours(23, 59, 59, 999);
	const booking = await bookingModel.find({ room_id: roomId, date: { $gt: startDate, $lt: endDate } });

	const response = [];

	for (let i = room.workspace_id.from; i < room.workspace_id.to; i++) {
		let available = true;
		booking.forEach((ele) => {
			if (available && i >= ele.timing.from && i + 1 <= ele.timing.to) {
				available = false;
			}
		});
		response.push({ time: { from: i, to: i + 1 }, available });
	}
	ok200(res, response);
}

module.exports = { getAvailability, bookRoom, getAmenityAvailability };
