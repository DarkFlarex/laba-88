import express from "express";
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    try {
        const filter: Record<string, unknown> = {};
        if (req.query.postId) {
            filter.postId = req.query.postId;
        }

        const comments = await Comment.find(filter).populate('userPosted', 'username').sort({ datetime: -1 });

        return res.send(comments);
    } catch (error) {
        next(error);
    }
});

export default commentsRouter;