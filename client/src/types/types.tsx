///all posts
export interface IData {
    posts: IPost[];
    postsLength: number;
}
///post
export interface IPost {
    _id: string;
    title: string;
    text: string;
    tags: any[];
    imageUrl: string;
    timestamps: string;
    user: IUserInfo;
    likes: ILike[]; 
    comments: IComment[];
}
///one page
export interface IOnePost {
    post: IPost;
}
///all comments
export interface IComments {
    comments: IComment[];
}
///comment
export interface IComment {
    text: string;
    post: string;
    user: IUser;
    _id: string;
    date: string;
}
///useritem form posts, comments
export interface IUser {
    avatarUrl: string;
    firstName: string;
    surName: string;
    _id: string;
}
///userLogin
export interface IUserLogin {
    user: IUserInfo;
    token: string;
    message: string;
}
///userInfo
export interface IUserInfo {
    avatarUrl: string;
    firstName: string;
    surName: string;
    _id: string;
    posts: any[];
    email: string;
    timestamps: string;
    roles: any[];
    readingList: any[];
    comments: any[];
}
///create post
export interface ICreatePost {
    title: string;
    text: string;
    tags: string;
    url: string;
}

///create comment
export interface ICreate {
    id: string;
    text: string;
}
///like post
export interface ILike {
    category: string;
    result: string;
}
///save post
export interface ISave {
    category: string;
    result: string;
    readingList: any[];
}


