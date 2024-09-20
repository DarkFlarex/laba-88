import mongoose, {Types} from "mongoose";
import User from "./User";
import Post from "./Post";


const Schema = mongoose.Schema;

const CommentSchema
    = new Schema ({
    userPosted:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'user Post id does not exist'
        }
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref:'Post',
        required:true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await Post.findById(value);
                return Boolean(user);
            },
            message: 'Post id does not exist'
        }
    },
    comment:{
        type: String,
        required:true,
    },
    datetime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    });

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;