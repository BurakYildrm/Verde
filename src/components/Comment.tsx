import React from "react";

type Props = {
	name: string;
	email: string;
	text: string;
};

const Comment: React.FC<Props> = ({ name, email, text }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col items-start">
				<p className="font-bold">{name}</p>
				<p className="text-sm text-gray-500">{email}</p>
			</div>
			<p className="text-sm">{text}</p>
		</div>
	);
};

export default Comment;
