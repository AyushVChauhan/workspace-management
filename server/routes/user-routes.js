const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { asyncRouteHandler } = require('../utils/router-utils');
const { verify } = require('../controllers/common-controller');
const { bookRoom, getAvailability, getAmenityAvailability } = require('../controllers/user-controller');

const router = express.Router();

router.use(authMiddleware('USER'));
router.get('/verify', asyncRouteHandler(verify));

router.post('/booking/availability/:roomId', asyncRouteHandler(getAvailability));
router.post('/booking/availability/amenity/:roomId', asyncRouteHandler(getAmenityAvailability));
router.post('/booking/book/:roomId', asyncRouteHandler(bookRoom));

module.exports = router;
