import React, {FC} from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userLogout } from '../../store/reducers/UserSlice';
import style from './usermenu.module.scss';

const UserMenu: React.FC = () => {
    const {user, menu} = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(userLogout())
    }
    console.log(user.posts, 'menu');
    
    return (
        <div className={style.usermenu}>
            <ul className={style.list}>
                <Link to='info'><li className={style.item}>{user.email}</li></Link>
                <Link to='setting'><li className={style.item}>Settings</li></Link>
                <Link to='my_posts'><li className={style.item}>My posts</li></Link>
                <li className={style.item} onClick={logout}>Sing out</li>
            </ul>
        </div>
    );
}

export default UserMenu;
