import React, { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import style from './error.module.scss';

interface IError {
    name: string;
    close?: () => void;
    bool?: boolean;
}

const ErrorMsg: React.FC<IError> = ({name, close, bool}) => {
    // console.log(bool, 'err');
    
    return (
        <>
            <label className={!bool ? style.bool : style.error}>{name}
            {/* <label className={style.error}>{name} */}
                <AiOutlineClose
                    className={style.icon}
                    onClick={close} />
            </label>
        </>
    );
}

export default ErrorMsg;
