import express from "express";
import {PostMutation} from "../types";
import Post from "../models/Post";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res,next) => {
    try {
        const posts = await Post.find().populate('userPosted', 'username').sort({ datetime: -1 });
        return res.send(posts);
    } catch (error){
        next(error);
    }
});

postsRouter.post('/', auth ,imagesUpload.single('image'),async (req: RequestWithUser,res,next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }

        if (!req.body.title) {
            return res.status(400).send({ error: 'Title is required!' });
        }

        if (!req.body.description && !req.file) {
            return res.status(400).send({ error: 'Description or image is required!' });
        }

        const postMutation:PostMutation = {
            userPosted: req.user._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
            datetime: new Date(),
        };
        const post = new Post(postMutation);
        await post.save();
        return res.send(post);
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError){
            return  res.status(400).send(error);
        }
        return next(error);
    }
});

export default postsRouter;