import React, {FC} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userLogout } from '../../store/reducers/UserSlice';
import style from './usermenu.module.scss';

const UserMenu: React.FC = () => {
    const navigate = useNavigate()
    
    const {user} = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()
    const logout = () => {
        navigate('/blog')
        dispatch(userLogout())
    }
    
    return (
        <div className={style.usermenu}>
            <ul className={style.list}>
                <Link to='/blog/info'><li className={style.item}>{user.email}</li></Link>
                <Link to='/blog/setting'><li className={style.item}>Settings</li></Link>
                <Link to='/blog/my_posts'><li className={style.item}>My posts</li></Link>
                <Link to='/blog/reading_list'><li className={style.item}>Reading list</li></Link>
                <li className={style.item} onClick={logout}>Sing out</li>
            </ul>
        </div>
    );
}

export default UserMenu;
