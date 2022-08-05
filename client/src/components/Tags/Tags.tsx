import React, {FC} from 'react';
import { idText } from 'typescript';
import { useAppSelector } from '../../hooks/redux';
import style from './tags.module.scss';

const Tags: React.FC = () => {
    const posts = useAppSelector(state => state.posts.posts)

    return (
        <div className={style.tags}>
            {posts.map(el => <li className={style.item} key={el._id}>#{el.tags}</li>)}
        </div>
    );
}

export default Tags;
