"use client";

import {
	Comment as CommentType,
	getPostComments,
	setLocalStorageItem,
	StorageKeyEnum,
	deletePost as deletePostService,
	updatePost as updatePostService,
} from "@/services";
import {
	selectPost,
	useAppDispatch,
	useAppSelector,
	deletePost,
	selectUser,
	updatePost,
} from "@/store";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, Loading } from "react-daisyui";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Comment } from "@/components";
import Swal from "sweetalert2";

type Props = {
	id: string;
};

const PostDetail: React.FC<Props> = ({ id }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [title, setTitle] = useState<string>("");
	const [detail, setDetail] = useState<string>("");
	const [userId, setUserId] = useState<number>(-1);
	const [comments, setComments] = useState<CommentType[]>([]);
	const posts = useAppSelector(selectPost);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (posts.length > 0) {
			const post = posts.find((post) => post.id === parseInt(id));

			if (!post) {
				notFound();
			}

			setTitle(post.title);
			setDetail(post.body);
			setUserId(post.userId);
			getPostComments(id).then((comments) => {
				setComments(comments);
				setLoading(false);
			});
			return;
		}
	}, []);

	useEffect(() => {
		if (posts.length > 0) {
			const post = posts.find((post) => post.id === parseInt(id));

			if (!post) {
				notFound();
			}

			setTitle(post.title);
			setDetail(post.body);
			setUserId(post.userId);
			getPostComments(id).then((comments) => {
				setComments(comments);
				setLoading(false);
			});
			return;
		}
	}, [posts]);

	const handleDelete = () => {
		deletePostService(id).then(() => {
			dispatch(deletePost(parseInt(id)));
			setLocalStorageItem(
				StorageKeyEnum.POSTS,
				posts.filter((post) => post.id !== parseInt(id))
			);
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Post deleted successfully",
				showConfirmButton: false,
				timer: 1500,
			});
			router.back();
		});
	};

	const handleUpdate = () => {
		updatePostService(id, {
			title,
			body: detail,
			userId: user!,
		}).then((res) => {
			console.log(res);
			dispatch(updatePost(res));
			setLocalStorageItem(
				StorageKeyEnum.POSTS,
				posts.filter((post) => post.id !== parseInt(id)).concat(res)
			);
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Post updated successfully",
				showConfirmButton: false,
				timer: 1500,
			});
			router.back();
		});
	};

	return (
		<>
			<div
				className={`flex flex-col items-center justify-center h-full ${
					loading ? "" : "hidden"
				}`}
			>
				<Loading variant="infinity" size="lg" />
			</div>
			<div className={`container ${loading ? "hidden" : ""}`}>
				<div className="flex sm:flex-row flex-col sm:items-start sm:justify-around gap-12">
					<div className="flex flex-col gap-4 flex-1">
						<p className="text-xl font-bold">Post {id}</p>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Title</span>
							</label>
							<Input
								color="neutral"
								size="md"
								placeholder="Post title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								disabled={user != userId}
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Detail</span>
							</label>
							<Textarea
								color="neutral"
								size="md"
								placeholder="Post details"
								rows={4}
								value={detail}
								onChange={(e) => setDetail(e.target.value)}
								disabled={user != userId}
								className="disabled:resize-none"
							/>
						</div>
						<div
							className={`flex sm:flex-row flex-col sm:gap-8 gap-4 justify-end ${
								user != userId ? "hidden" : ""
							}`}
						>
							<Button
								color="error"
								size="md"
								className="sm:order-1 order-last"
								onClick={(e) => {
									const daisySwal = Swal.mixin({
										customClass: {
											confirmButton:
												"btn btn-error mr-2.5",
											cancelButton:
												"btn bg-gray-500 hover:bg-gray-600 border-0 text-gray-200",
										},
										buttonsStyling: false,
									});

									daisySwal
										.fire({
											title: "Are you sure?",
											text: "You won't be able to revert this!",
											icon: "warning",
											showCancelButton: true,
											confirmButtonText:
												"Yes, delete it!",
										})
										.then((result) => {
											if (result.isConfirmed) {
												handleDelete();
											}
										});
								}}
							>
								<HiTrash />
								Delete
							</Button>
							<Button
								color="info"
								size="md"
								className="sm:order-last order-1"
								onClick={handleUpdate}
							>
								<HiPencil />
								Update
							</Button>
						</div>
					</div>
					<div className="flex flex-col gap-4 max-h-full flex-1 mb-8">
						<p className="text-xl font-bold">Comments</p>
						<div className="flex flex-col gap-5">
							{comments.map((comment) => (
								<Comment
									key={comment.id}
									name={comment.name}
									email={comment.email}
									text={comment.body}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostDetail;
