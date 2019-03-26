import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDVvkNFJwWIg5u8FtizLRlgHc22lGb_1aI',
	authDomain: 'chat-app-6079d.firebaseapp.com',
	databaseURL: 'https://chat-app-6079d.firebaseio.com',
	projectId: 'chat-app-6079d',
	storageBucket: 'chat-app-6079d.appspot.com',
	messagingSenderId: '30890816492',
};

firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setUpPresence(user) {
	const isOfflineForRTDB = {
		state: 'offline',
		lastChanged: firebase.database.ServerValue.TIMESTAMP,
	};
	const isOnlineforRTDB = {
		state: 'online',
		lastChanged: firebase.database.ServerValue.TIMESTAMP,
	};
	const rtdbRef = rtdb.ref(`/status/${user.uid}`);
	rtdb.ref('.info/connected').on('value', async snapshot => {
		if (snapshot.val() === false) {
			return;
		}
		await rtdbRef.onDisconnect().set(isOfflineForRTDB);
		// online
		rtdbRef.set(isOnlineforRTDB);
	});
}
export { db, firebase };
