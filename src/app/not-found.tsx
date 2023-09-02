import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex-1 flex flex-col items-center justify-center">
			<div className="container">
				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="text-2xl">404</h1>
					<h2 className="text-xl">Page Not Found</h2>
					<p className="text-center">
						The page you are looking for might have been removed,
						had its name changed or is temporarily unavailable.
					</p>
					<Link className="btn btn-warning" href="/">
						Go to home page
					</Link>
				</div>
			</div>
		</div>
	);
}
