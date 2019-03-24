import firebase from 'firebase';
import 'firebase/firestore';

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

export { db };
