import React, { FC, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';
import style from './postitem.module.scss';
import noImg from '../../../assets/no_img.jpg'
import { IPost } from '../../../types/types';
import UserItem from '../../../components/UserItem/UserItem';
import { endOfWords } from '../../../components/endOfWords';
import Button from '../../../UI/Button/Button';
import { saveArticle } from '../../../store/actions/Comment&&OnePostAction';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const PostItem: React.FC<IPost> = ({
    title,
    tags,
    text,
    timestamps,
    imageUrl,
    _id,
    comments,
    user,
    likes
}) => {
    // console.log('POSTITEM', user, timestamps);
    const dispatch = useAppDispatch()
    const readingList = useAppSelector(state => state.post.readingList)

    
    const savePost = () => {
        dispatch(saveArticle(_id))
    }

    const saveArray = JSON.parse(localStorage.getItem("saved_posts") || "") 
    const saveItem = saveArray.find((el: string) => el === _id)
    
    // useEffect(() => {
    //     console.log('useEffect');
    // },[readingList]);

        
    return (
        <div className={style.post__item}>
            <Link to={'/post/' + _id} className={style.link__img}>
                <img src={imageUrl ? imageUrl : noImg} alt="" />
            </Link>

            <UserItem
                timestamps={timestamps}
                // {...user} 
                surName={user.surName}
                avatarUrl={user.avatarUrl}
                firstName={user.firstName}
            />
            <div className={style.content__block}>
                <Link
                    to={'/post/' + _id}
                    className={style.link}
                >
                    <h2>{title}</h2>
                </Link>
                <div className={style.tags__block}>
                    {tags.map(el =>
                        <Link to={el} key={Math.random()}>
                            <span className={style.tags} key={Math.random()}># {el}</span>
                        </Link>)}
                </div>
                <div className={style.bottom__block}>
                    <div className={style.details__block}>
                        <span className={style.item}
                        >
                            <AiOutlineHeart
                                className={style.icon}
                                size={"1.4em"}
                            />
                            {likes.length < 1 ? '' : likes.length}
                            {endOfWords(likes.length, ' like')}</span>
                        <span className={style.item}>
                            <AiOutlineComment
                                size={"1.4em"}
                                className={style.icon}
                            />
                            {comments.length < 1 ? '' : comments.length}
                            {endOfWords(comments.length, ' comment')}</span>
                    </div>
                    {saveItem === _id
                        ? <Button value='unsave' bgColor='gold' action={savePost} />
                        : <Button value='save' bgColor='black' action={savePost} />
                    }

                </div>
            </div>
        </div>
    );
}

export default PostItem;

