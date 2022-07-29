import React, {FC} from 'react';
import style from './button.module.scss';

interface ButtonProps {
    value: string;
    action?: () => void;
    color?: string;
    bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({value, action, color, bgColor}) => {

    const findColor = () => {
        if(bgColor === 'red') {
            return {backgroundColor: "#A2242F", color: 'white'}
        }
        if(bgColor === 'gray') {
            return {backgroundColor: "#939597", color: 'white'}
        }
        if(bgColor === 'green') {
            return {backgroundColor: "#A0DAA9", color: 'black'}
        }
        if(bgColor === 'gold') {
            return {backgroundColor: "#FFD662", color: 'black'}
        }
    }
    
    return (
        <>
            <button onClick={action} 
            style={bgColor ? findColor() : {backgroundColor: '#363945', color: 'white'}}
            className={style.button}>{value}</button>
        </>
    );
}

export default Button;
