"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";

type Props = {
	text: string;
	size: string;
};

const SizeMap: Record<string, string> = {
	sm: "text-sm",
	md: "text-md",
	lg: "text-lg",
	xl: "text-xl",
	"2xl": "text-2xl",
};

const BackButton: React.FC<Props> = ({ text, size }) => {
	const router = useRouter();

	const goBack = () => {
		router.back();
	};

	return (
		<div className={`flex flex-row gap-4 items-center ${SizeMap[size]}`}>
			<span className="cursor-pointer" onClick={goBack}>
				<HiArrowLeft />
			</span>
			<p className="pointer-events-none">{text}</p>
		</div>
	);
};

export default BackButton;
