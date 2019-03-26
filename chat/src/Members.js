import React from 'react';
import useCollection from './useCollection';
//db.where(field, operator, value)
function Members({ channelId }) {
	const members = useCollection(`users`, undefined, [
		`channels.${channelId}`,
		'==',
		true,
	]);
	console.log(members);
	return (
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
	);
}

export default Members;
