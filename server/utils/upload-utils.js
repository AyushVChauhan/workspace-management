const { storage } = require('../firebase/firebase-config');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fs = require('fs');

/**
 * deletes the local file if upload is successfull
 * @param {string} filePath path of file in local
 * @param {string} destination destination in cloud (eg: `uploads/abc.jpg`)
 * @returns {Promise<string>} url of the file
 */
async function uploadFile(filePath, destination) {
	const fileRef = ref(storage, destination);
	const file = fs.readFileSync(filePath);
	const data = await uploadBytes(fileRef, file);
	const url = await getDownloadURL(fileRef);
	fs.rmSync(filePath);
	return url;
}
module.exports = { uploadFile };
