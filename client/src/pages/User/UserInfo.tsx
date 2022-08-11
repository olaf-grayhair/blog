import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import avatar from '../../assets/user.png'
import style from './user.module.scss';
import { monthFunck } from '../../components/months';
import { showMenu } from '../../store/reducers/UserSlice';
import Button from '../../UI/Button/Button';

const UserInfo: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(showMenu(false))
      },[]);

    const { avatarUrl, firstName, surName, timestamps, roles, email, posts, _id, readingList, comments} = useAppSelector(state => state.users.user)
    return (
        <div className={style.userinfo}>
            <div className={style.user__block}>
                <img className={style.avatar} src={avatarUrl ? avatarUrl : avatar} alt="" />
                <Link to='/setting' className={style.btn__move}>
                    <Button value='edit profile' bgColor='gold'/>
                </Link>
                <div className={style.name}>
                    <h2 className={style.h2}>{firstName + ' ' + surName}</h2>
                    <span className={style.item}>{`joined on ${monthFunck(timestamps)}`}</span>
                </div>
            </div>
            <div className={style.user__content}>
                <span className={style.item}>{posts.length} posts published</span>
                <span className={style.item}>{comments.length} comments written</span>
                <span className={style.item}>{readingList.length} reading list</span>
            </div>
        </div>
    );
}

export default UserInfo;
