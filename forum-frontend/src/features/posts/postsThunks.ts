import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {GlobalError, Post, PostMutation} from "../../types";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store";

export const fetchPosts = createAsyncThunk(
    'posts/fetchAll',
    async () => {
        const { data: posts } = await axiosApi.get<Post[]>(`/posts`,);
        return posts;
});

export const createPost = createAsyncThunk<void, PostMutation, { rejectValue: GlobalError; state: RootState }>(
    'posts/create',
    async (postMutation, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        const formData = new FormData();
        const keys = Object.keys(postMutation) as (keyof PostMutation)[];
        keys.forEach((key) => {
            const value = postMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axiosApi.post('/posts', formData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);