import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectComments, selectCommentsFetching} from "./commentsSlice";
import {fetchCommentsOnePost} from "./commentsThunks";
import {useParams} from "react-router-dom";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import CommentsItem from "./components/CommentsItem";
import NewComment from "./NewComment";
import {selectUser} from "../users/usersSlice";

const Comments = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    const isFetching = useAppSelector(selectCommentsFetching);
    const user = useAppSelector(selectUser);


    useEffect(() => {
        dispatch(fetchCommentsOnePost(id));
    }, [dispatch,id]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchCommentsOnePost(id));
        }, 3000);

        return () => clearInterval(interval);
    }, [dispatch, id]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no comments here!</Alert>;

    if (isFetching && comments.length === 0) {
        content = <CircularProgress/>;
    } else if (comments.length > 0) {
        content = comments.map((comment) => (
            <CommentsItem
                key={comment._id}
                comment={comment.comment}
                datetime={comment.datetime}
                author={comment.userPosted.username}
            />
        ));
    }
    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1">
                        Comment
                    </Typography>

                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {user ?
                        <NewComment /> :
                        <Typography variant="body1">
                            Войдите в учетную запись, чтобы оставить комментарий
                        </Typography>}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Comments;