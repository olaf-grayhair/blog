import React, { FC, useState } from 'react';
import style from './input.module.scss';

interface InputProps {
    value: string;
}



const Input: React.FC<InputProps> = ({value}) => {

    const [value, setValue] = useState('')

    const addValue = (e: : React.ChangeEvent<HTMLInputElement>) => {
        
    }

    return (
        <div className={style.input}>
            <label htmlFor="name">{value}</label>
            <input type="text" value={value}/>
        </div>
    );
}

export default Input;
