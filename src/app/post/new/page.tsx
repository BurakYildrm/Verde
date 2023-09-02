import React from "react";
import NewPost from "./NewPost";
import { BackButton } from "@/components";

export async function generateMetadata() {
	return {
		title: "New Post",
	};
}

const New: React.FC = () => {
	return (
		<div className="flex-1 flex flex-col">
			<div className="my-4 ml-8">
				<BackButton text="Posts" size="2xl" />
			</div>
			<div className="flex-1 flex flex-col justify-center items-center">
				<div className="container max-w-2xl">
					<NewPost />
				</div>
			</div>
		</div>
	);
};

export default New;
