"use client";

import React, { useEffect, useState } from "react";
import {
	Avatar,
	Badge,
	Button,
	Dropdown,
	Indicator,
	Navbar,
} from "react-daisyui";
import { selectPost, setPosts } from "@/store/postSlice";
import { selectUser, setUser, useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";
import {
	HiArrowLeftOnRectangle,
	HiArrowRightOnRectangle,
} from "react-icons/hi2";
import {
	getLocalStorageItem,
	StorageKeyEnum,
	getAllPosts,
	setLocalStorageItem,
} from "@/services";

const Navigation = () => {
	const posts = useAppSelector(selectPost);
	const user = useAppSelector(selectUser);
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!user) {
			const storageUser = parseInt(
				localStorage.getItem("USER_ID") ?? "-1"
			);
			dispatch(setUser(storageUser));
			if (storageUser != -1) {
				localStorage.setItem("USER_ID", storageUser.toString());
			}
		}

		if (posts.length == 0) {
			const posts = getLocalStorageItem(StorageKeyEnum.POSTS);

			if (posts) {
				dispatch(setPosts(posts));
				setLoading(false);
				return;
			}

			getAllPosts().then((posts) => {
				dispatch(setPosts(posts));
				setLocalStorageItem(StorageKeyEnum.POSTS, posts);
				setLoading(false);
			});
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<Navbar className="shadow-xl">
			<div className="flex-1">
				<Link href="/">
					<Button
						className="text-xl normal-case hover:bg-base-100"
						color="ghost"
					>
						Verde
					</Button>
				</Link>
			</div>
			<div className="flex-none">
				<Indicator className="mr-4">
					<Badge
						size="sm"
						color="secondary"
						className={Indicator.Item.className()}
					>
						{!loading &&
							posts.filter((post) => post.userId === user).length}
					</Badge>
					<Link href="/posts">
						<Button
							color="ghost"
							className="h-8 min-h-0 px-2 normal-case"
						>
							Posts
						</Button>
					</Link>
				</Indicator>
				<Dropdown.Details end>
					<Dropdown.Details.Toggle className="bg-base-100 border-0 hover:bg-base-100">
						<Avatar
							shape="circle"
							size="xs"
							src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							className={`${!user || user == -1 ? "hidden" : ""}`}
						/>
						<Avatar
							shape="circle"
							size="xs"
							src="/user.svg"
							className={`opacity-50 ${
								!user || user == -1 ? "" : "hidden"
							}`}
						/>
					</Dropdown.Details.Toggle>
					<Dropdown.Menu className="mt-3 z-[1] w-52 menu-sm">
						<Dropdown.Item
							className={`${user == -1 ? "" : "hidden"}`}
							href="/login"
						>
							<HiArrowRightOnRectangle />
							Login
						</Dropdown.Item>
						<Dropdown.Item
							className={`${user == -1 ? "hidden" : ""}`}
							onClick={() => {
								dispatch(setUser(-1));
								localStorage.removeItem("USER_ID");
							}}
						>
							<HiArrowLeftOnRectangle />
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown.Details>
			</div>
		</Navbar>
	);
};

export default Navigation;
