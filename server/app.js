require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { asyncRouteHandler, errorHandler } = require('./utils/router-utils');
const { login, register, updateNotificationToken } = require('./controllers/common-controller');
const { dbConnect, addAdmin } = require('./utils/database-utils');
const adminRoutes = require('./routes/admin-routes');
const userRoutes = require('./routes/user-routes');
const morgan = require('morgan');
const { authMiddleware } = require('./middlewares/auth-middleware');
const { paymentConfirm } = require('./controllers/user-controller');
const port = process.env.PORT || 3001;
const app = express();

app.use(cors({ maxAge: 3600 }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(express.static('public'));

app.post('/login', asyncRouteHandler(login));
app.post('/register', asyncRouteHandler(register));
app.post('/notification-token', authMiddleware(undefined), asyncRouteHandler(updateNotificationToken));
app.get('/payment-success', asyncRouteHandler(paymentConfirm));

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
// app.post('/forgot-password', asyncRouteHandler(sendToken));
// app.post('/reset-password', asyncRouteHandler(resetPassword));

app.all('*', (req, res, next) => {
	next({ message: 'Invalid Route', stack: 'app.js' });
});
app.use(errorHandler);

startServer();

async function startServer() {
	await dbConnect();
	// await addAdmin();
	app.listen(port, () => {
		console.log('http://localhost:' + port);
	});
}
