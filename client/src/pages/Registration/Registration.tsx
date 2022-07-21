import React, {FC} from 'react';
import { Link } from "react-router-dom";
import Button from '../../UI/Button/Button';
import Input from '../../UI/input/Input';
import style from './registration.module.scss';

const Registration: React.FC = () => {
    return (
        <div className={style.registration}>
            <h2>REGISTRATION</h2>
            <div className={style.input__block}>
                <Input value='email'/>
                <Input value='password'/>
                <Input value='name'/>
                <Input value='surname'/>
            </div>
            <div className={style.btn__block}>
                <Button value='create'/>
                <Link to='/login'>Already have an account?</Link>
            </div>
        </div>
    );
}

export default Registration;
