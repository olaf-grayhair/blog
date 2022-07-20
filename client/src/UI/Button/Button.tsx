import React, {FC} from 'react';
import style from './button.module.scss';

interface ButtonProps {
    value: string;
}

const Button: React.FC<ButtonProps> = ({value}) => {
    return (
        <>
            <button className={style.button}>{value}</button>
        </>
    );
}

export default Button;
