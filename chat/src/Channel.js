import React, { useEffect } from 'react';
import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';
import { db } from './firebase';

function Channel({ user, channelId }) {
	useEffect(() => {
		db.doc(`users/${user.uid}`).update({
			[`channels.${channelId}`]: true, // <-- deep update using a firebase api
			// channels: {
			// 	[channelId]: true, // computed property <-- would override same value
			// },
		});
	}, [channelId, user.uid]);
	return (
		<div className="Channel">
			<div className="ChannelMain">
				<ChannelInfo channelId={channelId} />
				<Messages channelId={channelId} />
				<ChatInputBox user={user} channelId={channelId} />
			</div>
			<Members />
		</div>
	);
}

export default Channel;
