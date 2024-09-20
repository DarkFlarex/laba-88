import {GlobalError, Post} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchPosts} from "./postsThunks";

export interface PostsState {
    items: Post[];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
}

const initialState: PostsState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError:null,
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending,(state) =>{
                state.itemsFetching = true;
            })
            .addCase(fetchPosts.fulfilled,(state,{payload: post}) =>{
                state.itemsFetching = false;
                state.items = post;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.itemsFetching = false;
            });

        builder
            .addCase(createPost.pending, (state) => {
                state.isCreating = true;
                state.isCreatingError = null;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createPost.rejected, (state, { payload: error }) => {
                state.isCreating = false;
                state.isCreatingError = error || null;
            });
    },
    selectors:{
        selectPosts:(state)=>state.items,
        selectPostsFetching:(state) =>state.itemsFetching,
        selectPostCreate:(state) => state.isCreating,
        selectPostCreateError:(state) => state.isCreatingError,
    }
});

export const postsReducer = postsSlice.reducer;

export const {
    selectPosts,
    selectPostsFetching,
    selectPostCreate,
    selectPostCreateError,
} = postsSlice.selectors;

