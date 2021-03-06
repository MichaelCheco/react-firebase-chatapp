import React from 'react';
import useCollection from './useCollection';
import { Link } from '@reach/router';
import { firebase } from './firebase';
function Nav({ user }) {
	const channels = useCollection('channels');
	return (
		<div className="Nav">
			<div className="User">
				<img className="UserImage" alt="whatever" src={user.photoUrl} />
				<div>
					<div>{user.displayName}</div>
					<div>
						<button
							className="text-button"
							onClick={() => {
								firebase.auth().signOut();
							}}>
							log out
						</button>
					</div>
				</div>
			</div>
			<nav className="ChannelNav">
				{channels.map(channel => (
					<Link key={channel.id} to={`/channel/${channel.id}`}>
						# {channel.id}
					</Link>
				))}
			</nav>
		</div>
	);
}

export default Nav;
