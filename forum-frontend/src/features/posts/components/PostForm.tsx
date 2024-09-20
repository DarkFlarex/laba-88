import React, { useState } from 'react';
import { PostMutation } from "../../../types";
import {Alert, Grid, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FileInput from "../../../UI/FileInput/FileInput";
import SaveIcon from '@mui/icons-material/Save';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import { selectPostCreateError } from "../postsSlice";
import {createPost} from "../postsThunks";
import {useNavigate} from "react-router-dom";

interface Props {
    isLoading: boolean;
}

const PostForm: React.FC<Props> = ({  isLoading }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectPostCreateError);
    const [state, setState] = useState<PostMutation>({
        title: '',
        description: null,
        image: null,
    });

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(createPost(state)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Create post error:', err);
        }
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (

        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
            {error && (
                <Alert severity="error" sx={{mt: 3}}>
                    {error.error}
                </Alert>
            )}
            <Grid item>
                <TextField
                    label="Title"
                    id="title"
                    name="title"
                    value={state.title}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <TextField
                    multiline
                    minRows={3}
                    label="Description"
                    id="description"
                    name="description"
                    value={state.description}
                    onChange={inputChangeHandler}
                />
            </Grid>

            <Grid item>
                <FileInput
                    label="Image"
                    name="image"
                    onChange={fileInputChangeHandler}
                />
            </Grid>
            <Grid item>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default PostForm;
