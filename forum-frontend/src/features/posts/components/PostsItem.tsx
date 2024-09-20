import React from 'react';
import {Card, CardContent, CardMedia, Grid, styled} from "@mui/material";
import {Link} from "react-router-dom";
import imageNotFound from '/src/assets/images/image-not-found.png';
import {API_URL} from "../../../constants";
import dayjs from 'dayjs';

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    _id:string;
    userPosted: string;
    title:string;
    image: string | null;
    datetime: string;
}

const PostsItem:React.FC<Props> = ({_id,userPosted,title,image,datetime}) => {
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    return (
        <Grid item sx={{ width: '300px' }}>
            <Card sx={{height: '100%'}}>
                <ImageCardMedia image={cardImage} title={title}/>
                <CardContent>
                    <span>{dayjs(datetime).format('DD.MM.YYYY HH:mm')}</span>
                </CardContent>
                <CardContent>
                    <span>{userPosted}</span>
                </CardContent>
                <CardContent>
                    <Link to={`comments/${_id}`}>{title}</Link>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PostsItem;