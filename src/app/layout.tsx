import { AppProvider } from "@/store";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Copyright from "@/components/Copyright";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "All Posts",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AppProvider>
			<html lang="en" data-theme="dark" className="min-h-screen">
				<body
					className={`${inter.className} flex flex-col h-screen min-h-screen`}
				>
					<Navigation />
					<div className="flex-1 flex">{children}</div>
					<Copyright />
				</body>
			</html>
		</AppProvider>
	);
}
