import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import style from './post.module.scss';
import UserItem from '../../components/UserItem/UserItem';
import Comment from '../../components/Comment/Comment';
import { IComments, ILike, IPost, IUser } from '../../types/types';
import Loader from '../../components/Loader/Loader';
import CreateComment from '../../components/Comment/CreateComment';
import { AiFillHeart } from 'react-icons/ai';
import { fetchLike, fetchOnePost } from '../../store/actions/PostAction';
import { MdDeleteForever } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { setCommentId } from '../../store/reducers/CommentSlice';
import { showPopup, showPopupPost } from '../../store/reducers/UserSlice';

export interface IP {
    _id: string;
    title: string;
    text: string;
    tags: any[];
    imageUrl: string;
    timestamps: string;
    userId: string;
    user: any;
    likes?: ILike[];///up
    comments: any[];
    action: any;
    isAuth: boolean;
}

const PostOne: React.FC<IP> = ({ title, tags, text, timestamps, imageUrl, _id, isAuth, userId, user }) => {
    const [bool, setBool] = useState<boolean>(false)
    const { isLoading, error, post } = useAppSelector(state => state.post)
    const posts = useAppSelector(state => state.posts.posts)
    const result = Array.from(new Set(posts.map(el => el.tags).flat()))
    console.log(tags, 'tags');
    
    const { like } = useAppSelector(state => state.posts)

    const commnetsArray = post.comments.map(el => <Comment key={el._id} {...el} />)

    const dispatch = useAppDispatch()

    const likeItem = localStorage.getItem('like')

    const likeToogle = () => {
        dispatch(fetchLike(_id))
    }

    const show = () => {
        dispatch(showPopupPost(true))
        dispatch(setCommentId(_id))
    }

    // useEffect(() => {
               
    //   },[]);
      

    return (

        <div className={style.post}>
            <div className={style.post__item}>
                <div className={style.left__block}>
                    <div className={style.details__block}>
                        <span>like</span>
                        <button>save</button>
                    </div>
                </div>

                <div className={style.centre__block}>
                    {userId === user._id && 
                    <div className={style.owner__icons}>
                        <MdDeleteForever 
                        className={style.icon} 
                        onClick={show}
                        />
                        <BsFillPencilFill className={style.icon} />
                    </div>}
                    <img className={style.poster} src={imageUrl} alt="" />
                    <div className={style.text__block}>
                        <UserItem
                            timestamps={timestamps}
                            surName={user.surName}
                            avatarUrl={user.avatarUrl}
                            firstName={user.firstName}
                        />

                        <div className={style.content__block}>
                            <h2>{title}</h2>
                            <div className={style.tags__block}>
                                {tags.map(tag => <span className={style.tags}>#{tag}</span>)}
                            </div>
                            <p>{text}</p>
                            <div className={style.article__icons}>
                                <AiFillHeart className={likeItem !== 'create' ? style.icon : style.icon__active} size={"2em"}
                                    onClick={likeToogle}
                                />
                                <span>{post.likes?.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.comment__block}>
                        <h3 className={style.discussion}>Discussion ({post.comments.length})</h3>
                        {isAuth && <CreateComment _id={_id} />}
                        {commnetsArray}
                    </div>
                </div>

                <div className={style.right__block}>
                    user info
                </div>
            </div>
        </div>
    );
}

export default PostOne;
