import { LoginForm } from "@/components";
import React from "react";

export async function generateMetadata() {
	return {
		title: "Login",
	};
}

const Login: React.FC<void> = () => {
	return (
		<div className="flex-1 flex flex-col justify-center items-center">
			<LoginForm />
		</div>
	);
};

export default Login;
