export interface IData {
    posts: IPost[];
    postsLength: number;
    users: IUser[];
}

export interface IPost {
    _id: string;
    title: string;
    text: string;
    tags: string;
    imageUrl: string;
    timestamps: string;
    user: string;
    comments: any[];
}

export interface IOnePost {
    post: IPost;
    user: IUser;
}

export interface IComments {
    comments: IComment[];
    users: IUser[];
}

export interface IComment {
    text: string;
    post: string;
    user: string;
    _id: string;
    date: string;
}

export interface IUser {
    avatarUrl: string;
    firstName: string;
    surName: string;
    _id: string;
}
