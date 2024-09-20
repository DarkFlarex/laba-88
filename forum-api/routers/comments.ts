import express from "express";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";
import Comment from '../models/Comment';
import mongoose from "mongoose";

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

commentsRouter.post('/', auth ,async (req: RequestWithUser,res,next) => {
  try {
    if (!req.user) {
        return res.status(401).send({ error: 'User not found' });
    }

    const post = await Post.findById(req.body.postId);

    if (!post) {
        return res.status(404).send({ error: 'Post not found!' });
    }

      if (!req.body.comment) {
          return res.status(404).send({ error: 'comment not found!' });
      }

        const comment = new Comment({
            userPosted: req.user._id,
            postId: req.body.postId,
            comment: req.body.comment,
            datetime: new Date(),
        });
        await comment.save();
        return res.send(comment);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return  res.status(400).send(error);
        }
        return next(error);
    }
});

export default commentsRouter;