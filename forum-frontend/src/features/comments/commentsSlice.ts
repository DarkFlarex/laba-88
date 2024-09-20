import {createSlice} from "@reduxjs/toolkit";
import {createComment, fetchCommentsOnePost} from "./commentsThunks";
import {Comment, GlobalError} from "../../types";

export interface CommentsState {
    items: Comment [];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
}

const initialState: CommentsState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError:null,
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchCommentsOnePost.pending,(state) =>{
                state.itemsFetching = true;
            })
            .addCase(fetchCommentsOnePost.fulfilled,(state,{payload: comment}) =>{
                state.itemsFetching = false;
                state.items = comment
            })
            .addCase(fetchCommentsOnePost.rejected, (state) => {
                state.itemsFetching = false;
            });

        builder
            .addCase(createComment.pending, (state) => {
                state.isCreating = true;
                state.isCreatingError = null;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createComment.rejected, (state, { payload: error }) => {
                state.isCreating = false;
                state.isCreatingError = error || null;
            });

    },
    selectors:{
        selectComments:(state) => state.items,
        selectCommentsFetching:(state) =>state.itemsFetching,
        selectCommentCreate:(state) => state.isCreating,
        selectCommentCreateError:(state) => state.isCreatingError,
    }
});

export const commentsReducer = commentsSlice.reducer;

export const {
    selectComments,
    selectCommentsFetching,
    selectCommentCreate,
    selectCommentCreateError,
} = commentsSlice.selectors;