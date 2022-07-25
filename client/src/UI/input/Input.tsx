import React, { FC, useState, useEffect } from 'react';
import { IState } from '../../pages/Login/Login';
import style from './input.module.scss';

interface InputProps {
    value: string;
    // setPassword?: (password: string) => void;
    setName?: any;
    setSurName?: any;
    setEmail?: any;
    setPassword?: any; ///FIX IT !!!
}



const Input: React.FC<InputProps> = ({value, setEmail, setPassword, setName, setSurName}) => {

    const [text, setText] = useState<string>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    useEffect(() => {
        if(value === 'email') {
            setEmail(text)
        }
        if(value === 'password') {
            setPassword(text)
        }
        if(value === 'name') {
            setName(text)
        }
        if(value === 'surname') {
            setSurName(text)
        }
    },[text]);




    return (
        <div className={style.input}>
            <label htmlFor="name">{value}</label>
            <input 
            type={value === 'password' ? 'password' : 'text'} value={text} onChange={changeHandler}/>
        </div>
    );
}

export default Input;
