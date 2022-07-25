import React, { FC } from 'react';
import { Link } from "react-router-dom";
import style from './header.module.scss';
import logo from '../../assets/ts.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { URL_API } from '../url';
import avatar from '../../assets/user.png'
import UserMenu from '../UserMenu/UserMenu';
import { showMenu } from '../../store/reducers/UserSlice';
import Button from '../../UI/Button/Button';


const Header: FC = () => {
    const dispatch = useAppDispatch()
    const {isAuth, menu} = useAppSelector(state => state.users)
    const {avatarUrl} = useAppSelector(state => state.users.user)

    const openMenu = () => {
        dispatch(showMenu(!menu))
    }

    return (
        <div className={style.header}>
            <nav>
                <div className={style.logo__block}>
                    <Link to='/' className={style.logo}>
                        <img src={logo} alt="logo" />
                        Blog
                    </Link>
                    <input type="text" />
                </div>
                {!isAuth
                    ? <div className={style.login__block}>
                        <Link to="/login">login</Link>
                        <Link to="/registration">create account</Link>
                    </div>
                    : <div className={style.login__block}>
                        <Link to="/new"><Button value='create post' bgColor='gold'/></Link>
                        <div className={style.userinfo}>
                            <img className={style.avatar} src={avatarUrl ? URL_API + avatarUrl : avatar} alt="" 
                            onClick={openMenu}
                            />
                        </div>
                        {menu ? <UserMenu/> : ''}
                        
                    </div>
                }
            </nav>
        </div>
    );
}

export default Header;
