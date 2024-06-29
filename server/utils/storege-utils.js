const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const destinationPath = './public/uploads';
		fs.mkdir(destinationPath, { recursive: true }, (err) => {
			if (err) {
				throw new CustomError(err, err.code);
			}
			cb(null, destinationPath);
		});
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

module.exports = upload;
