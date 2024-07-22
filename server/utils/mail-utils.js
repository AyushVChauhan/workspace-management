const nodemailer = require('nodemailer');
const { CustomError } = require('./router-utils');
const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

async function sendMail(receiver, subject, message) {
	const emailFooter = `
    <p style="font-size: 12px; color: #999;">This email was automatically generated by QuizPortal. Please do not reply to this email.</p>
    `;

	const fullMessage = message + emailFooter;

	let mailOptions = {
		from: 'QuizPortal <avcthehero@gmail.com>',
		to: receiver,
		subject: subject,
		html: fullMessage,
	};

	try {
		const emailRes = await transporter.sendMail(mailOptions);
		console.log(emailRes);
	} catch (err) {
		throw CustomError('Failed to send mail', 400);
	}
}

async function sendMailToStudents(studentArray, passwords) {
	for (let index = 0; index < studentArray.length; index++) {
		const ele = studentArray[index];
		const emailSubject = 'Welcome to our QuizPortal';
		const emailText = `
		Dear ${ele['username']},<br>
		Your account has been created successfully.<br>
		<br>
		Username: ${ele.username}<br>
		Password: ${passwords[index]}<br>
		<br>
		You can change your password at <a href="https://quizportalfrontend.onrender.com">Quiz Portal</a><br>
		`;

		await sendMail(ele['email'], emailSubject, emailText);
	}
}

async function passwordReset(username, email, randomBytes) {
	const resetLink = process.env.FRONTEND_URL + 'reset-password?token=' + randomBytes;
	const emailText = `
	<div style="font-family: Arial, sans-serif;">
		<p>Dear ${username},</p>
		<p>You have requested to reset your password for QuizPortal. Please click the link below to reset your password:</p>
		<p><a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
		<p>If you didn't request a password reset, please ignore this email.</p>
		<p>Thank you!</p>
	</div>`;
	await sendMail(email, 'Password Reset for QuizPortal', emailText);
}

async function publishResultMail(studentsMails, quizSubject, quizDate, quizName) {
	const emailText = `
	<div style="font-family: Arial, sans-serif;">
        <p>Dear Students,</p>
        <p>Your quiz result for the <strong style="color: #007bff;">${quizSubject}</strong> quiz titled "<strong style="color: #007bff;">${quizName}</strong>" has been published.</p>
        <p>The quiz was held on <strong style="color: #007bff;">${quizDate}</strong>.</p>
        <p>You can view your result in Quiz History</p>
        <p>Thank you!</p>
    </div>`;
	await sendMail(studentsMails, `Quiz ${quizName} Result Published`, emailText);
}
module.exports = {
	sendMail,
	sendMailToStudents,
	passwordReset,
	publishResultMail,
};
