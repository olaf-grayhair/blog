import React, { FC, ReactElement } from 'react';
import style from './input.module.scss';

interface IInput {
    name?: string;
    value?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const UserInput: FC<IInput> = ({ name, value, type, onChange }) => {
    // console.log(type);

    return (
        <div className={style.user__input}>
            <label htmlFor="name">{name}</label>
            <input
                className={style.input}
                type='text'
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default UserInput;
