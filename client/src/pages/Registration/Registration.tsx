import React, {FC} from 'react';
import { Link } from "react-router-dom";
import Button from '../../UI/Button/Button';
import style from './registration.module.scss';

const Registration: React.FC = () => {
    return (
        <div className={style.registration}>
            <h2>REGISTRATION</h2>
            <div className={style.input__block}>
                <label htmlFor="name">name</label>
                <input type="text" />
                <label htmlFor="name">surname</label>
                <input type="text" />
            </div>
            <div className={style.btn__block}>
                <Button value='create'/>
                <Link to='/login'>Already have an account?</Link>
            </div>
        </div>
    );
}

export default Registration;
