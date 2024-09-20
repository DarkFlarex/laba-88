export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface Post {
    _id:string;
    userPosted: {
        username:string;
    };
    title:string;
    description: string | null;
    image: string | null;
    datetime: string;
}

export interface PostMutation {
    title:string;
    description: string | null;
    image: string | null;
}

export interface Comment {
    _id: string;
    userPosted: {
        username:string;
    };
    postId: string;
    comment: string;
    datetime: string;
}

export interface CommentMutation {
    comment: string;
    postId:string| null;
}