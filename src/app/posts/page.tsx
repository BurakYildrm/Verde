import UserPosts from "./Posts";

export async function generateMetadata() {
	return {
		title: "User Posts",
	};
}

const Posts: React.FC = () => {
	return <UserPosts />;
};

export default Posts;
