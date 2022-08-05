import React, { FC, useState } from 'react';
import { useInput } from '../../components/validation';
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

    const [errorMessage, setMessage] = useState<boolean>(false)
    const { message } = useAppSelector(state => state.users)
    const checkMsg = message.split(' ', 1).pop()


    const email = useInput('', 'email')
    const password = useInput('', 'password')

    const Login = () => {
        if (!email.emailError) email.setEmail(false)
        else email.setEmail(true)

        if (!password.passwordError) password.setPassword(false)
        else password.setPassword(true)

        if (email.inputValid && password.inputValid) {
            console.log(email.inputValid);
            console.log(password.inputValid);
            console.log('DISPATCH');
            
            dispatch(fetchUserLogin({ email: email.value, password: password.value }))
            setMessage(true)
        } else{
            console.log(email.inputValid);
            console.log(password.inputValid);
            console.log('NOT DISPATCH');
        }
    }

    const closeEmail = () => {
        email.setEmail(false)
    }

    const closePassword = () => {
        password.setPassword(false)
    }

    const closeMessage = () => {
        setMessage(false)
    }

    return (
        <div className={style.login}>
            <h2>LOGIN</h2>
            <div className={style.input__block}>
                {(checkMsg === 'user' && errorMessage) && <ErrorMsg name={message} 
                close={closeMessage} 
                />}
                
                {email.email && <ErrorMsg name='wrong email' close={closeEmail} />}
                <UserInput
                    name='email'
                    value={email.value}
                    onChange={email.onChange}
                />

                {checkMsg === 'password' && <ErrorMsg name={message} close={closePassword} />}
                {password.password && <ErrorMsg name='wrong password' close={closePassword} />}
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
