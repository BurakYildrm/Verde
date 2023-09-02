"use server";

import { Post } from "@/store/postSlice";

export interface Comment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	const posts = await response.json();
	return posts;
};

export const getPost = async (id: string): Promise<Post> => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`
	);
	const post = await response.json();
	return post;
};

export const getPostComments = async (id: string): Promise<Comment[]> => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}/comments`
	);
	const comments = await response.json();
	return comments;
};

export const addPost = async (data: Partial<Post>): Promise<Post> => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json",
		},
	});
	const post = await response.json();
	return post;
};

export const updatePost = async (
	id: string,
	data: Partial<Post>
): Promise<Post> => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
		{
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json",
			},
		}
	);
	const post = await response.json();
	return post;
};

export const deletePost = async (id: string): Promise<void> => {
	await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
		method: "DELETE",
	});
};
