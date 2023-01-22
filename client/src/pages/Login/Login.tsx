import React, { FC, useState } from 'react';
import { useInput } from '../..//hooks/valid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserLogin } from '../../store/actions/UserAction';
import Button from '../../UI/Button/Button';
import UserInput from '../../UI/input/UserInput';
import style from './login.module.scss';
import ErrorMsg from '../../UI/Error/ErrorMsg';

export interface IState {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useAppDispatch()

    const email = useInput('', 'email')
    const password = useInput('', 'password')

    const Login = () => {
        email.onClick()
        password.onClick()
        if (email.inputValid && password.inputValid){
            dispatch(fetchUserLogin({ email: email.value, password: password.value }))
            email.setMsgState(false) 
        }

    }


    return (
        <div className={style.login}>
            <h2>LOGIN</h2>
            <div className={style.input__block}>

                <ErrorMsg name={email.message}
                    bool={email.msgState}
                    close={email.onClose}
                />

                <ErrorMsg name='wrong email'
                    bool={email.err}
                    close={email.onClose}
                />
                <UserInput
                    name='email'
                    value={email.value}
                    onChange={email.onChange}
                />

                <ErrorMsg name='wrong password'
                    bool={password.err}
                    close={password.onClose}
                />
                <UserInput
                    name='password'
                    value={password.value}
                    onChange={password.onChange}
                />
            </div>
            <div className={style.btn__block}>
                <Button value='login' action={Login} />
            </div>
        </div>
    );
}

export default Login;
