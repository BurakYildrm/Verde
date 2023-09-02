import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

interface PostState {
	value: Post[];
}

const initialState: PostState = {
	value: [],
};

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setPosts: (state, action: PayloadAction<Post[]>) => {
			state.value = action.payload;
		},
		addPost: (state, action: PayloadAction<Post>) => {
			state.value.push(action.payload);
		},
		deletePost: (state, action: PayloadAction<number>) => {
			state.value = state.value.filter(
				(post) => post.id !== action.payload
			);
		},
		updatePost: (state, action: PayloadAction<Post>) => {
			const index = state.value.findIndex(
				(post) => post.id === action.payload.id
			);
			if (index !== -1) {
				state.value[index] = action.payload;
			}
		},
	},
});

export const { setPosts, addPost, deletePost, updatePost } = postSlice.actions;
export const selectPost = (state: RootState) => state.post.value;
export default postSlice.reducer;
