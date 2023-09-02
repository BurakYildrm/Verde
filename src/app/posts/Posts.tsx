"use client";

import { PostList } from "@/components";
import { selectPost, selectUser, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loading } from "react-daisyui";

const Posts: React.FC = () => {
	const posts = useAppSelector(selectPost);
	const user = useAppSelector(selectUser);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (user == -1) {
			router.push("/login");
			return;
		}

		if (user) {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (user == -1) {
			router.push("/login");
			return;
		}

		if (user && loading) {
			setLoading(false);
		}
	}, [user]);

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
				<PostList
					posts={posts.filter((post) => post.userId === user)}
					showAddPost={true}
				/>
			</div>
		</div>
	);
};

export default Posts;
