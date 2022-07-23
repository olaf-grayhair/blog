import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { monthFunck } from '../../components/months';
import { URL_API } from '../../components/url';
import style from './post.module.scss';
import UserItem from '../../components/UserItem/UserItem';
import Comment from '../../components/Comment/Comment';
import { IPost } from '../../types/types';
import Loader from '../../components/Loader/Loader';



const PostOne: React.FC<IPost> = ({ title, tags, text, timestamps, imageUrl, _id,}) => {
    // const { title, tags, text, timestamps, imageUrl, _id, comments } = useAppSelector(state => state.post.post)
    const { isLoading, error, post, user } = useAppSelector(state => state.post)
    const {comments, users} = useAppSelector(state => state.comment)
    // console.log(user, 'POSTONE');

    const commnetsArray = comments.map(el => <Comment key={el._id} {...el} />)

    let arr1:any[] = [...comments]
    let arr2:any[] = [...users]
    
    let arr = arr1.map(comm => ({...comm, user: arr2.map(el => el)}))
    // let newArray = array.map(el => el.text = {...el, text: 'war'})
    console.log(arr);
    

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
                        <img className={style.poster} src={URL_API + imageUrl} alt="" />
                        <div className={style.text__block}>
                            <UserItem 
                            timestamps={timestamps} 
                            // avatarUrl={user.avatarUrl}
                            // firstName={user.firstName}
                            // surName={user.surName}
                            />

                            <div className={style.content__block}>
                                <h2>{title}</h2>
                                <div className={style.tags__block}>
                                    <span className={style.tags}>#{tags}</span>
                                </div>
                                <p>{text}</p>
                            </div>
                        </div>
                        <div className={style.comment__block}>
                            <h3>Discussion {comments.length}</h3>
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
