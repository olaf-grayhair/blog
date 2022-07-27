import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOnePost } from '../../store/actions/PostAction';

import { Link } from 'react-router-dom';
import { URL_API } from '../url';
import style from './postitem.module.scss';
import noImg from '../../assets/no_img.jpg'
import { monthFunck } from '../months';
import { IPost } from '../../types/types';
import UserItem from '../UserItem/UserItem';

interface PostItemProps{
    title: string;
    tags: string;
    text: string;
    imageUrl: string;
    timestamps: string;
    comments: any[];
    _id: string;
    user: object;
}

const PostItem: React.FC<IPost> = ({ 
    title, 
    tags, 
    text, 
    timestamps, 
    imageUrl, 
    _id, 
    comments,
    user
 }) => {


    return (
        <div className={style.post__item}>
            <Link to={'/post/' + _id} className={style.link__img}>
                <img src={imageUrl? imageUrl : noImg} alt="" />
            </Link>

            <UserItem 
            timestamps={timestamps}
            {...user} 
            />
            <div className={style.content__block}>
                <Link 
                    to={'/post/' + _id} 
                    className={style.link}
                >
                    <h2>{title}</h2>
                </Link>
                <div className={style.tags__block}>
                    <span className={style.tags}>#{tags}</span>
                </div>
                <div className={style.bottom__block}>
                    <div className={style.details__block}>
                        <span className={style.icon}>like</span>
                        <span className={style.icon}>{comments.length} comment</span>
                    </div>
                    <button>save</button>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
