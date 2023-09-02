import { PostDetail, BackButton } from "@/components";
import React from "react";

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({ params: { id } }: Props) {
	return {
		title: `Post ${id}`,
	};
}

const Post: React.FC<Props> = ({ params: { id } }) => {
	return (
		<>
			<div className="flex-1 flex flex-col">
				<div className="my-4 ml-8">
					<BackButton text="Posts" size="2xl" />
				</div>
				<div className="flex-1 flex flex-col">
					<PostDetail id={id} />
				</div>
			</div>
		</>
	);
};

export default Post;
