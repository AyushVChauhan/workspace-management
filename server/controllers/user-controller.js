const { isValidObjectId, default: mongoose } = require('mongoose');
const { CustomError } = require('../utils/router-utils');
const roomModel = require('../models/room.models');
const bookingModel = require('../models/bookings.models');
const amenityModel = require('../models/amenities.models');
const { ok200 } = require('../utils/response-utils');
const stripe = require('../utils/stripe-utils');

async function bookRoom(req, res, next) {
	//amenities = [{id:, quantity:,}]
	const { roomId } = req.params;
	const { from, to, amenities, date } = req.body;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	if (to <= from) throw new CustomError('To and From Invalid', 400);

	const room = await roomModel.findOne({ _id: roomId, is_active: 1 }).populate('workspace_id');
	if (!room) throw new CustomError('Invalid RoomID');

	const dateString = new Date(date).toLocaleDateString();

	const booking = await bookingModel.find({ room_id: roomId, is_active: 1, date: dateString });
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
			date: dateString,
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
		date: dateString,
		is_active: 0,
		room_id: new mongoose.Types.ObjectId(roomId),
		timing: { from, to },
		user_id: new mongoose.Types.ObjectId(res.locals.userData._id),
		workspace_id: room.workspace_id._id,
	});

	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount * 100,
		currency: 'usd',
		description: newBooking._id.toString(),
		automatic_payment_methods: {
			enabled: true,
		},
	});

	newBooking.payment_id = paymentIntent.client_secret;
	newBooking.payment_status = 'PENDING';

	await newBooking.save();

	res.send({ paymentId: paymentIntent.client_secret });
}

async function getAmenityAvailability(req, res, next) {
	const { roomId } = req.params;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	const { from, to } = req.body.timing;
	const { date } = req.body;
	if (to <= from) throw new CustomError('To and From Invalid', 400);

	const room = await roomModel.findOne({ _id: roomId, is_active: 1 }).populate('workspace_id');
	if (!room || room.workspace_id?.is_active != 1) throw new CustomError('Invalid RoomId', 400);

	const dateString = new Date(date).toLocaleDateString();

	const amenities = await amenityModel.find({ workspace_id: room.workspace_id._id, is_active: 1 }).lean();
	for (let index = 0; index < amenities.length; index++) {
		const element = amenities[index];
		const booking = await bookingModel.find({
			'amenities.id': element._id,
			is_active: 1,
			date: dateString,
		});
		booking.forEach((ele) => {
			//TODO to be changed
			if (ele.timing.to < to) {
				element.quantity -= ele.amenities.find((ele) => ele.id.equals(element._id)).quantity;
			}
		});
		if (element.quantity < 0) element.quantity = 0;
	}
	ok200(res, amenities);
}

async function getAvailability(req, res, next) {
	const { roomId } = req.params;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	const room = await roomModel.findOne({ _id: roomId, is_active: 1 }).populate('workspace_id');
	if (!room || room.workspace_id?.is_active != 1) throw new CustomError('Invalid RoomId', 400);

	const { date } = req.body;
	const dateString = new Date(date).toLocaleDateString();
	const booking = await bookingModel.find({ room_id: roomId, date: dateString, is_active: 1 });

	const response = [];

	for (let i = room.workspace_id.timing.from; i < room.workspace_id.timing.to; i++) {
		let available = true;
		booking.forEach((ele) => {
			if (available && i >= ele.timing.from && i + 1 <= ele.timing.to) {
				console.log('here');
				available = false;
			}
		});
		response.push({ time: { from: i, to: i + 1 }, available });
	}
	ok200(res, response);
}

async function getRoom(req, res, next) {
	const { roomId } = req.params;
	if (!isValidObjectId(roomId)) throw new CustomError('Bad Request!', 400);

	const room = await roomModel.findOne({ _id: roomId, is_active: 1 });
	if (!room) throw new CustomError('Invalid RoomId', 400);

	ok200(res, room);
}

async function paymentConfirm(req, res, next) {
	if (req.query.redirect_status == 'succeeded') {
		const booking = await bookingModel.findOne({ payment_id: req.query.payment_intent_client_secret });
		booking.is_active = 1;
		booking.payment_status = 'SUCCESS';
		await booking.save();
	}
	res.redirect('http://localhost:5173');
}

async function history(req, res, next) {
	const userId = res.locals.userData._id;
	const bookings = await bookingModel
		.find({ is_active: 1, user_id: userId })
		.populate('amenities.id')
		.populate('workspace_id')
		.populate('room_id');
	ok200(res, bookings);
}

module.exports = { getAvailability, bookRoom, getAmenityAvailability, getRoom, paymentConfirm, history };
