import React from 'react';
import {Card, CardContent, Grid} from "@mui/material";

import dayjs from 'dayjs';

interface Props {
    comment: string,
    datetime: string,
    author: string,
}

const PostsItem:React.FC<Props> = ({comment,datetime,author}) => {

    return (
        <Grid item sx={{ width: '300px' }}>
            <Card sx={{height: '100%'}}>

                <CardContent>
                    <span>{dayjs(datetime).format('DD.MM.YYYY HH:mm')}</span>
                </CardContent>
                <CardContent>
                    <span>{comment}</span>
                </CardContent>
                <CardContent>
                    <span>{author}</span>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PostsItem;