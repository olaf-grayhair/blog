import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import style from './post.module.scss';
import UserItem from '../../components/UserItem/UserItem';
import Comment from '../../components/Comment/Comment';
import { IPost } from '../../types/types';
import Loader from '../../components/Loader/Loader';
import CreateComment from '../../components/Comment/CreateComment';
import { AiFillHeart } from 'react-icons/ai';
import { fetchLike, fetchOnePost } from '../../store/actions/PostAction';

export interface IP {
    _id: string;
    title: string;
    text: string;
    tags: string;
    imageUrl: string;
    timestamps: string;
    user: object;
    likes?: any[]; 
    comments: any[];
    action: any;
}

const PostOne: React.FC<IP> = ({ title, tags, text, timestamps, imageUrl, _id, action}) => {
    const { isLoading, error, post } = useAppSelector(state => state.post)
    const { isAuth } = useAppSelector(state => state.users)

    const { comments } = useAppSelector(state => state.comment)

    const commnetsArray = comments.map(el => <Comment key={el._id} {...el} />)
    console.log(post.likes);
    const dispatch = useAppDispatch()


    const likeToogle = () => {
        dispatch(fetchLike(_id))
    }

    useEffect(() => {

    }, [post.likes]);
    return (
        <>
            <div className={style.post}>
                <div className={style.post__item}>
                    <div className={style.left__block}>
                        <div className={style.details__block}>
                            <span>like</span>
                            <button>save</button>
                        </div>
                    </div>

                    <div className={style.centre__block}>
                        <img className={style.poster} src={imageUrl} alt="" />
                        <div className={style.text__block}>
                            <UserItem
                                timestamps={timestamps}
                                {...post.user}
                            />

                            <div className={style.content__block}>
                                <h2>{title}</h2>
                                <div className={style.tags__block}>
                                    <span className={style.tags}>#{tags}</span>
                                </div>
                                <p>{text}</p>
                                <div className={style.article__icons}>
                                    <AiFillHeart className={style.icon} size={"2em"}
                                    onClick={likeToogle}
                                    /> 
                                    <span>{post.likes?.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.comment__block}>
                            <h3 className={style.discussion}>Discussion ({comments.length})</h3>
                            {isAuth && <CreateComment _id={_id} />}
                            {commnetsArray}
                        </div>
                    </div>

                    <div className={style.right__block}>
                        user info
                    </div>
                </div>
            </div>
        </>


    );
}

export default PostOne;
