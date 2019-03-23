import React from 'react';
import firebase from 'firebase';
const config = {
	apiKey: 'AIzaSyDVvkNFJwWIg5u8FtizLRlgHc22lGb_1aI',
	authDomain: 'chat-app-6079d.firebaseapp.com',
	databaseURL: 'https://chat-app-6079d.firebaseio.com',
	projectId: 'chat-app-6079d',
	storageBucket: 'chat-app-6079d.appspot.com',
	messagingSenderId: '30890816492',
};

firebase.initializeApp(config);

function App() {
	return (
		<div className="App">
			<div className="Nav">
				<div className="User">
					<img
						className="UserImage"
						alt="whatever"
						src="https://placekitten.com/64/64"
					/>
					<div>
						<div>Michael Checo</div>
						<div>
							<button className="text-button">log out</button>
						</div>
					</div>
				</div>
				<nav className="ChannelNav">
					<a href="/channel/awesome"># awesome</a>
					<a className="active" href="/channel/general">
						# general
					</a>
				</nav>
			</div>
			<div className="Channel">
				<div className="ChannelMain">
					<div className="ChannelInfo">
						<div className="Topic">
							Topic: <input className="TopicInput" value="Awesome stuff" />
						</div>
						<div className="ChannelName">#general</div>
					</div>
					<div className="Messages">
						<div className="EndOfMessages">That's every message!</div>
						<div>
							<div className="Day">
								<div className="DayLine" />
								<div className="DayText">12/6/2018</div>
								<div className="DayLine" />
							</div>
							<div className="Message with-avatar">
								<div className="Avatar" />
								<div className="Author">
									<div>
										<span className="UserName">Ryan Florence </span>
										<span className="TimeStamp">3:37 PM</span>
									</div>
									<div className="MessageContent">Alright, lets do this.</div>
								</div>
							</div>
						</div>
						<div>
							<div className="Message no-avatar">
								<div className="MessageContent">works now?</div>
							</div>
						</div>
					</div>
					<div className="ChatInputBox">
						<input className="ChatInput" placeholder="Message #general" />
					</div>
				</div>
				<div className="Members">
					<div>
						<div className="Member">
							<div className="MemberStatus offline" />
							Ryan Florence
						</div>
						<div className="Member">
							<div className="MemberStatus online" />
							cleverbot
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
