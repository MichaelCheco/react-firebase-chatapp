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
				{members.map(member => (
					<div className="Member" key={member.id}>
						<div className="MemberStatus online" />
						{member.displayName}
					</div>
				))}
			</div>
		</div>
	);
}

export default Members;
