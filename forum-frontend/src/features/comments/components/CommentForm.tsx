import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {CommentMutation} from "../../../types";
import {selectCommentCreateError} from "../commentsSlice";
import {createComment} from "../commentsThunks";
import {Alert, Grid, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
    isLoading: boolean;
}

const CommentForm: React.FC<Props> = ({isLoading}) => {
    const { id: postId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectCommentCreateError);
    const [state, setState] = useState<CommentMutation>({
        comment: '',
        postId:postId || null,
    });

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(createComment({...state})).unwrap();
            setState({ comment: '', postId: postId || null });
        } catch (e) {
            console.error('Create comment error:', e);
        }
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
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
                    label="Comment"
                    id="comment"
                    name="comment"
                    value={state.comment}
                    onChange={inputChangeHandler}
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

export default CommentForm;