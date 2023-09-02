"use client";

import { Post } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "react-daisyui";

type Props = {
	posts: Post[];
	showAddPost?: boolean;
};

const PostList: React.FC<Props> = ({ posts, showAddPost }) => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	const handleOnClick = (e: React.MouseEvent) => {
		const id = parseInt(e.currentTarget.getAttribute("data-id")!);
		router.push(`/post/${id}`);
	};

	return (
		<>
			{!loading && (
				<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
					{posts.map((post, i) => (
						<Card
							className="bg-neutral hover:bg-neutral-focus hover:cursor-pointer group min-h-[20rem]"
							key={i}
							data-id={post.id}
							onClick={handleOnClick}
						>
							<Card.Body>
								<Card.Title tag="h2">{post.title}</Card.Title>
								<p>{post.body}</p>
							</Card.Body>
						</Card>
					))}
					{showAddPost && (
						<Card
							imageFull
							className="bg-neutral hover:bg-neutral-focus hover:cursor-pointer group min-h-[20rem]"
							onClick={() => router.push("/post/new")}
						>
							<Card.Image
								src="/plus.svg"
								alt="plus"
								className="group-hover:opacity-50"
							/>
							<Card.Body className="items-center justify-center group-hover:flex hidden">
								<Card.Title tag="h2">New Post</Card.Title>
							</Card.Body>
						</Card>
					)}
				</div>
			)}
		</>
	);
};

export default PostList;
