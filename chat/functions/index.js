const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.onUserStatusChanged = functions.database
	.ref('status/{userId}')
	.onUpdate((change, context) => {
		const eventStatus = change.after.val();
		eventStatus.lastChanged = new Date(eventStatus.lastChanged);
		const userDoc = db.doc(`users/${context.params.userId}`);
		return change.after.ref.once('value').then(snapshot => {
			const status = snapshot.val();
			if (status.lastChanged > eventStatus.lastChanged) {
				return;
			}
			userDoc.update({
				status: eventStatus,
			});
		});
	});

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});

const bot = {
	displayName: 'cleverbot',
	photoUrl: 'https://i.imgur.com/ydOMC2c.png',
	uid: 'cleverbot',
	status: {
		lastChanged: new Date(),
		state: 'online',
	},
	channels: {
		general: true,
	},
};

db.collection('users')
	.doc(bot.uid)
	.set(bot, { merge: true });

exports.onCleverbotMessage = functions.firestore
	.document('channels/general/messages/{messageId}')
	.onCreate((doc, context) => {
		const message = doc.data();
		if (!message.text.startsWith('@cleverbot')) {
			return;
		}
		return db.colleection('channels/general/messages').add({
			text: 'hey, what"s up? ',
			user: db.collection('users').doc('cleverbot'),
			createdAt: new Date(),
		});
	});
