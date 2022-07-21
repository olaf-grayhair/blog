import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getOnePost } from '../../store/actions/PostAction';

import { Link } from 'react-router-dom';
import { URL_API } from '../url';
import style from './postitem.module.scss';
import noImg from '../../assets/no_img.jpg'
import { monthFunck } from '../months';

interface PostItemProps {
    title: string;
    tags: string;
    text: string;
    imageUrl: string;
    timestamps: string;
    comments: any[];
    _id: string;
}

const PostItem: React.FC<PostItemProps> = ({ title, tags, text, timestamps, imageUrl, _id, comments }) => {


    const dispatch = useAppDispatch()
    
    const changePage = () => {
        dispatch(getOnePost(_id))
    }
    // useEffect(() => {
    //     dispatch(getOnePost(_id))
    //   },[]);

    return (
        <div className={style.post__item}>
            <Link to='/post' className={style.link__img}>
                <img src={imageUrl? URL_API + imageUrl : noImg} alt="" />
            </Link>
            <div className={style.top__block}>
                <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ea1OGrCb--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png" alt="avatart" className={style.avatar} />
                <div className={style.user__block}>
                    <span>name</span>
                    <time dateTime={timestamps}>{monthFunck(timestamps)}</time>
                </div>
            </div>
            <div className={style.content__block}>
                <Link 
                    to={'/post/' + _id} 
                    className={style.link}
                    onClick={changePage}
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
