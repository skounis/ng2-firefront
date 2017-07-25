const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.validatePrefix = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		let prefix = req.query.prefix;
		let currentKey = req.query.key;
		let year = parseInt(req.query.year, 10);

		admin.database().ref('/conferences').on('value', (snapshot) => {
			let data = snapshot.val();

			let items = Object.keys(data)
				.filter(key => key !== currentKey)
				.filter(key => data[key].startDate)
				.map(key => data[key]);

			let invalid = items
				.some(item => item.prefix === prefix && item.startDate.year === year);

			res.send({
				valid: !invalid
			});
		});
	});
});