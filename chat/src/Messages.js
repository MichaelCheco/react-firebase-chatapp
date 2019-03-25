import React from 'react';
import useCollection from './useCollection';
import useDocWithCache from './useDocWithCache';
import formatDate from 'date-fns/format';

function Messages({ channelId }) {
	const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');

	return (
		<div className="Messages">
			<div className="EndOfMessages">That's every message!</div>
			{messages.map((message, index) => {
				const previous = messages[index - 1];
				const showDay = false;
				const showAvatar = shouldShowAvatar(previous, message);
				return showAvatar ? (
					<FirstMessageFromUser
						key={message.id}
						message={message}
						showDay={showDay}
					/>
				) : (
					<div key={index}>
						<div className="Message no-avatar">
							<div className="MessageContent">{message.text}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
function FirstMessageFromUser({ message, showDay }) {
	const author = useDocWithCache(message.user.path);
	return (
		<div key={message.id}>
			{showDay && (
				<div className="Day">
					<div className="DayLine" />
					<div className="DayText">12/6/2018</div>
					<div className="DayLine" />
				</div>
			)}
			<div className="Message with-avatar">
				<div
					className="Avatar"
					style={{ backgroundImage: author ? `url("${author.photoUrl}")` : '' }}
				/>
				<div className="Author">
					<div>
						<span className="UserName">{author && author.displayName}</span>{' '}
						<span className="TimeStamp">
							{formatDate(message.createdAt.seconds * 1000, 'h:mm A')}
						</span>
					</div>
					<div className="MessageContent">{message.text}</div>
				</div>
			</div>
		</div>
	);
}
function shouldShowAvatar(previous, message) {
	const isFirst = !previous;
	if (isFirst) {
		return true;
	}
	const differentUser = message.user.id !== previous.user.id;
	if (differentUser) {
		return true;
	}
	const hasBeenAwhile =
		message.createdAt.seconds - previous.createdAt.seconds > 180;
	return hasBeenAwhile;
}
export default Messages;
