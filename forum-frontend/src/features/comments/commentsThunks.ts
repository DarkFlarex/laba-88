import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Comment, CommentMutation, GlobalError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchCommentsOnePost = createAsyncThunk<Comment[], string>(
    'comments/fetchAll',
    async (id) => {
        const {data: comments} = await axiosApi.get<Comment[]>(`/comments?postId=${id}`);
        return comments;
    }
);

export const createComment = createAsyncThunk<Comment, CommentMutation, { rejectValue: GlobalError, state: RootState }>(
    'comments/addComment',
    async (commentMutation, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        try {
            const { data: comment } = await axiosApi.post<Comment>(
                '/comments', commentMutation, { headers: { Authorization: `Bearer ${token}` } }
            );
            return comment;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);