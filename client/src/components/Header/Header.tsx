import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import style from './header.module.scss';
import logo from '../../assets/ts.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import avatar from '../../assets/user.png'
import UserMenu from '../UserMenu/UserMenu';
import { setSearchItem, showMenu } from '../../store/reducers/UserSlice';
import Button from '../../UI/Button/Button';
import UserInput from '../../UI/input/UserInput';
import { fetchSearchPost } from '../../store/actions/PostAction';
import { BsSearch } from 'react-icons/bs';

const Header: FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const { isAuth, menu } = useAppSelector(state => state.users)
    const { avatarUrl } = useAppSelector(state => state.users.user)

    const openMenu = () => {
        dispatch(showMenu(!menu))
    }

    const [search, setSearch] = useState<string>('')

    const searchPost = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onSearch = () => {
        if(search !== '') {
            dispatch(setSearchItem(search))
            navigate('../search', { replace: true })
            console.log('navigate');
            setSearch('')
        }
    }
    // console.log(search, 'search');

    return (
        <div className={style.header}>
            <nav>
                <div className={style.logo__block}>
                    <Link to='/' className={style.logo}>
                        <img src={logo} alt="logo" />
                        Blog
                    </Link>
                    <UserInput onChange={searchPost} value={search}/>
                    <div onClick={onSearch} className={style.onsearch}>
                        <BsSearch className={style.search} />
                    </div>


                </div>
                {!isAuth
                    ? <div className={style.login__block}>
                        <Link to="/login">login</Link>
                        <Link to="/registration">create account</Link>
                    </div>
                    : <div className={style.login__block}>
                        <Link to="/new"><Button value='create post' bgColor='gold' /></Link>
                        <div className={style.userinfo}>
                            <img className={style.avatar} src={avatarUrl ? avatarUrl : avatar} alt=""
                                onClick={openMenu}
                            />
                        </div>
                        {menu ? <UserMenu /> : ''}

                    </div>
                }
            </nav>
        </div>
    );
}

export default Header;
