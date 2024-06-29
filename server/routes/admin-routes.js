const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { asyncRouteHandler } = require('../utils/router-utils');
const { verify } = require('../controllers/common-controller');
const {
	dashboard,
	getWorkspaces,
	getWorkspace,
	addWorkspace,
	history,
	roomHistory,
} = require('../controllers/admin-controller');
const upload = require('../utils/storege-utils');

const router = express.Router();

router.use(authMiddleware('ADMIN'));
router.get('/verify', asyncRouteHandler(verify));
router.get('/dashboard', asyncRouteHandler(dashboard));

router.get('/history', asyncRouteHandler(history));
router.get('/history/room/:roomId', asyncRouteHandler(roomHistory));

router.get('/workspace', asyncRouteHandler(getWorkspaces));
router.get('/workspace/:id', asyncRouteHandler(getWorkspace));
router.post('/workspace', upload.any(), asyncRouteHandler(addWorkspace));

module.exports = router;
