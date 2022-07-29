import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Button from '../../UI/Button/Button';
import style from './popup.module.scss';

interface IPopup {
    title: string;
    popup: boolean;
    close: () => void;
    action: () => void;
}

const Popup: React.FC<IPopup> = ({ title, popup, close, action}) => {
    // const popup = useAppSelector(state => state.users.popup)
    console.log();
    

    return (
        <div className={popup ? style.popupActive : style.popup}>
            <div className={style.block}>
                <h2 className={style.title}>{title}</h2>
                <div className={style.btn__block}>
                    <Button value='ok' bgColor='green' action={action}/>
                    <Button value='cancel' bgColor='red' action={close}/>
                </div>
            </div>
        </div>
    );
}

export default Popup;
