export interface IData {
    posts: any[];
    postsLength: number;
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

export interface IUser {
    id: number;
    name: string;
    email: string;
}
