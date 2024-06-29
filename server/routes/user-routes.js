const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { asyncRouteHandler } = require('../utils/router-utils');
const { verify } = require('../controllers/common-controller');

const router = express.Router();

router.use(authMiddleware('ADMIN'));
router.get('/verify', asyncRouteHandler(verify));

module.exports = router;
