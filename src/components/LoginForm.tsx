"use client";

import { selectUser, setUser, useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Input, Loading } from "react-daisyui";

const LoginForm: React.FC = () => {
	const [userId, setUserId] = useState("");
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (user != -1) {
			router.push("/");
			return;
		}

		const storageUser = localStorage.getItem("USER_ID") ?? "-1";

		if (storageUser != "-1") {
			dispatch(setUser(parseInt(storageUser)));
			router.push("/");
			return;
		}

		setLoading(false);
	}, []);

	return (
		<>
			<Loading
				variant="infinity"
				size="lg"
				className={`${loading ? "" : "hidden"}`}
			/>
			<div className={`container max-w-md ${loading ? "hidden" : ""}`}>
				<div className="flex flex-col gap-4">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">User ID</span>
						</label>
						<Input
							color="neutral"
							size="md"
							placeholder="Example: 1"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
						/>
					</div>
					<Button
						color="primary"
						size="md"
						onClick={() => {
							localStorage.setItem("USER_ID", userId);
							dispatch(setUser(parseInt(userId)));
							router.push("/");
						}}
					>
						Login
					</Button>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
