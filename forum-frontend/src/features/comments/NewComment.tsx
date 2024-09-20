import { useAppSelector} from "../../app/hooks";
import {Typography} from "@mui/material";
import {selectCommentCreate} from "./commentsSlice";
import CommentForm from "./components/CommentForm";

const NewPost = () => {
    const isCreating = useAppSelector(selectCommentCreate);
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New comment
            </Typography>
            <CommentForm isLoading={isCreating}/>
        </>
    );
};

export default NewPost;