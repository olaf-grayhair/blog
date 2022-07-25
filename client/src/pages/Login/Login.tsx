import React, {FC, useState} from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { fetchUserLogin } from '../../store/actions/UserAction';
import Button from '../../UI/Button/Button';
import Input from '../../UI/input/Input';
import style from './login.module.scss';

export interface IState {
    email: string;
    password:string;
}

const Login: React.FC = () => {
    const [name, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch()


    const Login = () => {
        const query = {email: name, password: password}

        dispatch(fetchUserLogin(query))
    }
    
    return (
        <div className={style.login}>
            <h2>LOGIN</h2>
            <div className={style.input__block}>
                <Input value='email' setEmail={setEmail}/>
                <Input value='password' setPassword={setPassword}
                />
            </div>
            <div className={style.btn__block}>
                <Button value='login' action={Login}/>
            </div>
        </div>
    );
}

export default Login;
