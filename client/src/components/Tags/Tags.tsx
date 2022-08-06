import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { useAppSelector } from '../../hooks/redux';
import style from './tags.module.scss';

const Tags: React.FC = () => {
    const posts = useAppSelector(state => state.posts.posts)
    const result = Array.from(new Set(posts.map(el => el.tags).flat()))

    return (
        <div className={style.tags}>
            {result.map(el => 
            <Link to={el} key={Math.random()}>
                <li className={style.item}>#{el}</li>
            </Link>)}
        </div>
    );
}

export default Tags;
