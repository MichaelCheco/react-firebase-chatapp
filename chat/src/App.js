import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { firebase, db, setUpPresence } from './firebase';
import { Router, Redirect } from '@reach/router';

function App() {
	const user = useAuth();

	return user ? (
		<div className="App">
			<Nav user={user} />
			<Router>
				<Channel user={user} path="channel/:channelId" />
				<Redirect from="/" to="channel/general" />
			</Router>
		</div>
	) : (
		<Login />
	);
}
function Login() {
	const [authError, setAuthError] = useState(null);

	const handleSignIn = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (error) {
			setAuthError(error);
		}
	};
	return (
		<div className="Login">
			<h1>Chat!</h1>
			<button onClick={handleSignIn}>Sign in with Google</button>
			{authError && (
				<div>
					<p>Sorry, there was a problem</p>
					<p>
						<i>{authError.message}</i>
					</p>
					<p>Please try again</p>
				</div>
			)}
		</div>
	);
}
function useAuth() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// this effect allows us to persist login
		return firebase.auth().onAuthStateChanged(firebaseUser => {
			if (firebaseUser) {
				const user = {
					displayName: firebaseUser.displayName,
					photoUrl: firebaseUser.photoURL,
					uid: firebaseUser.uid,
				};
				setUser(user);
				db.collection('users') //fb will automatically create collection/doc for us
					.doc(user.uid)
					.set(user, { merge: true }); // merge adds safety
				setUpPresence(user);
			} else {
				setUser(null);
			}
		});
	}, []);
	return user;
}
export default App;
