"use client";

import { Loading as DaisyLoading } from "react-daisyui";

export default function Loading() {
	return (
		<div className="flex-1 flex flex-col items-center justify-center">
			<DaisyLoading variant="infinity" size="lg" />
		</div>
	);
}
