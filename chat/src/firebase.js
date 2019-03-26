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
	rtdb.ref('.info/connected').on('value', snapshot => {
		console.log(snapshot.val());
	});
}
export { db, firebase };
