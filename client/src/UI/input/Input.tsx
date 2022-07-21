import React, { FC, useState } from 'react';
import style from './input.module.scss';

interface InputProps {
    value: string;
}



const Input: React.FC<InputProps> = ({value}) => {

    const [text, setText] = useState<string>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }
    console.log(text); 

    return (
        <div className={style.input}>
            <label htmlFor="name">{value}</label>
            <input type="text" value={text} onChange={changeHandler}/>
        </div>
    );
}

export default Input;
