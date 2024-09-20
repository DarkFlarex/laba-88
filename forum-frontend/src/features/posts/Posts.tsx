import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchPosts} from "./postsThunks";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import PostsItem from "./components/PostsItem";
import {selectPosts, selectPostsFetching} from "./postsSlice";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const isFetching = useAppSelector(selectPostsFetching);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no Posts here!</Alert>;
    if(isFetching) {
        content = <CircularProgress/>;
    } else if (posts.length > 0) {
        content = posts.map((post) => (
            <PostsItem
                key={post._id}
                _id={post._id}
                userPosted={post.userPosted.username}
                title={post.title}
                datetime={post.datetime}
                image={post.image}
            />
        ));
    }
    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1">
                        Posts
                    </Typography>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Posts;