import { configureStore } from "@reduxjs/toolkit";
import AppProvider from "./AppProvider";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import postReducer, {
	setPosts,
	addPost,
	deletePost,
	updatePost,
	selectPost,
	Post,
} from "./postSlice";
import userReducer, { setUser, selectUser } from "./userSlice";

export const store = configureStore({
	reducer: {
		post: postReducer,
		user: userReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export {
	AppProvider,
	setPosts,
	addPost,
	deletePost,
	updatePost,
	selectPost,
	setUser,
	selectUser,
};
export type { Post };
