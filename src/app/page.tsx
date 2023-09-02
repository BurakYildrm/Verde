"use client";

import { PostList } from "@/components";
import { selectPost, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { Loading } from "react-daisyui";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const posts = useAppSelector(selectPost);

	useEffect(() => {
		if (posts.length > 0) {
			setLoading(false);
		}
	}, [posts]);

	return (
		<div
			className={`flex-1 ${
				loading ? "flex flex-col items-center justify-center" : ""
			}`}
		>
			<Loading
				variant="infinity"
				size="lg"
				className={`${loading ? "" : "hidden"}`}
			/>
			<div className={`container my-8 ${loading ? "hidden" : ""}`}>
				<PostList posts={posts} />
			</div>
		</div>
	);
}
