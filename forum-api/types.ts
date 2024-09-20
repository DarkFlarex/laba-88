import {Types,Model} from "mongoose";

export interface PostMutation {
    userPosted: Types.ObjectId;
    title:string;
    description: string | null;
    image: string | null;
    datetime: Date;
}

export type PostModel = Model<PostMutation>;

export interface UserFields {
    username: string;
    password: string;
    token:string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;