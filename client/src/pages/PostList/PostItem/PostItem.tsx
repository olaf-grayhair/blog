import React, { FC, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import style from './postitem.module.scss';
import noImg from '../../../assets/no_img.jpg'
import { IPost } from '../../../types/types';
import UserItem from '../../../components/UserItem/UserItem';
import { endOfWords } from '../../../components/endOfWords';
import Button from '../../../UI/Button/Button';

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
    
    

    return (
        <div className={style.post__item}>
            <Link to={'/post/' + _id} className={style.link__img}>
                <img src={imageUrl? imageUrl : noImg} alt="" />
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
                    {tags.map(tag => <span className={style.tags}># {tag}</span>)}
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
                    <Button value='save' bgColor='gold'/>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
