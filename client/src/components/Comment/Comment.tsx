import React, {FC} from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCommentId } from '../../store/reducers/CommentSlice';
import { showPopup } from '../../store/reducers/UserSlice';
import { IComment } from '../../types/types';
import UserItem from '../UserItem/UserItem';
import style from './comment.module.scss';

const Comment: React.FC<IComment> = ({text, post, user, _id, date}) => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.users.user._id)
    const userCommentId = user._id

    const show = () => {
        dispatch(showPopup(true))
        dispatch(setCommentId(_id))
    }
    
    return (
        <div className={style.comment}>
            <UserItem timestamps={date} {...user}/>
            {userCommentId === userId 
            ? <FaWindowClose 
                className={style.delete} 
                onClick={show}
            /> 

            : ''
            }
            <p className={style.text}>{text}</p>
        </div>
    );
}

export default Comment