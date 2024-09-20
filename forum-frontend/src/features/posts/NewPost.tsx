import { useAppSelector} from "../../app/hooks";
import {selectPostCreate} from "./postsSlice";
import {Typography} from "@mui/material";
import PostForm from "./components/PostForm";

const NewPost = () => {
    const isCreating = useAppSelector(selectPostCreate);
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New Post
            </Typography>
            <PostForm isLoading={isCreating}/>
        </>
    );
};

export default NewPost;