"use client";

import {
	useAppDispatch,
	useAppSelector,
	selectUser,
	selectPost,
} from "@/store";
import React, { useEffect, useState } from "react";
import { Button, Input, Loading, Textarea } from "react-daisyui";
import { HiPlus } from "react-icons/hi2";
import {
	StorageKeyEnum,
	addPost as addPostService,
	setLocalStorageItem,
} from "@/services";
import { addPost } from "@/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const NewPost = () => {
	const [title, setTitle] = useState<string>("");
	const [detail, setDetail] = useState<string>("");
	const [titleColor, setTitleColor] = useState<string>("neutral");
	const [detailColor, setDetailColor] = useState<string>("neutral");
	const [loading, setLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const posts = useAppSelector(selectPost);
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
	const handleAddPost = () => {
		let check = false;

		if (title.length == 0) {
			check = true;
			setTitleColor("error");
		}

		if (detail.length == 0) {
			check = true;
			setDetailColor("error");
		}

		if (check) {
			return;
		}

		addPostService({
			title,
			body: detail,
			userId: user!,
		}).then((res) => {
			res.id = posts.slice(-1)[0].id + 1;
			dispatch(addPost(res));
			setLocalStorageItem(StorageKeyEnum.POSTS, posts.concat(res));
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Post added successfully",
				showConfirmButton: false,
				timer: 1500,
			});
			setTitle("");
			setDetail("");
		});
	};

	return (
		<>
			{loading && (
				<div className="flex flex-col justify-center items-center">
					<Loading variant="infinity" size="lg" />
				</div>
			)}
			{!loading && (
				<div className="flex flex-col gap-4 flex-1">
					<p className="text-xl font-bold">New Post</p>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Title</span>
						</label>
						<Input
							color={titleColor as any}
							size="md"
							placeholder="Post title"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
								setTitleColor("neutral");
							}}
						/>
						<div
							className={`text-sm text-error mt-1 ${
								titleColor == "error" ? "block" : "hidden"
							}`}
						>
							Please enter a title
						</div>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Detail</span>
						</label>
						<Textarea
							color={detailColor as any}
							size="md"
							placeholder="Post details"
							rows={4}
							value={detail}
							onChange={(e) => {
								setDetail(e.target.value);
								setDetailColor("neutral");
							}}
						/>
						<div
							className={`text-sm text-error mt-1 ${
								detailColor == "error" ? "block" : "hidden"
							}`}
						>
							Please enter details
						</div>
					</div>
					<div className={"flex sm:flex-row flex-col justify-end"}>
						<Button color="info" size="md" onClick={handleAddPost}>
							<HiPlus />
							Add Post
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default NewPost;
