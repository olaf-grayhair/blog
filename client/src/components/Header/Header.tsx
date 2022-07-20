import React, {FC} from 'react';
import { Link } from "react-router-dom";
import style from './header.module.scss';
import logo from '../../assets/ts.png';

const Header: FC = () => {
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
                <div className={style.login__block}>
                    <Link to="/login">login</Link>
                    <Link to="/registration">create account</Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;
