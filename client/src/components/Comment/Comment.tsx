import React, {FC} from 'react';
import { IComment } from '../../types/types';
import UserItem from '../UserItem/UserItem';
import style from './comment.module.scss';

const Comment: React.FC<IComment> = ({text, post, user, _id, date}) => {

    
    return (
        <div className={style.comment}>
            <UserItem timestamps={date}/>
            <p className={style.text}>{text}</p>
        </div>
    );
}

export default Comment