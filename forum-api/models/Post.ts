import mongoose, {HydratedDocument, Types} from "mongoose";
import { PostModel, PostMutation} from "../types";
import User from "./User";

const Schema = mongoose.Schema;

const PostSchema
    = new Schema<PostMutation,PostModel>({
    userPosted:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'user Post does not exist'
        }
    },
    title:{
         type:String,
         required:true,
     },
    description:{
        type: String,
        validate: {
             validator: async function(value:string): Promise<boolean> {
                const currentDocument = (this as HydratedDocument<PostMutation>)
                return !! (value || currentDocument.image);
            },
            message: `Either image or description must be present!`,
        }
    },
    image:{
        type: String,
        validate: {
            validator: async function(value:string): Promise<boolean> {
                const currentDocument = (this as HydratedDocument<PostMutation>)
                return !! (value || currentDocument.description);
            },
            message: `Either image or description must be present!`,
        }
    },
    datetime: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const Post = mongoose.model<PostMutation,PostModel>('Post', PostSchema);

export default Post;