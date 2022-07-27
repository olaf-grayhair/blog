import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Button from '../../UI/Button/Button';
import style from './popup.module.scss';

interface IPopup {
    title: string;
    popup: boolean;
    close: () => void;
}

const Popup: React.FC<IPopup> = ({ title, popup, close}) => {
    // const popup = useAppSelector(state => state.users.popup)


    return (
        <div className={popup ? style.popupActive : style.popup}>
            <div className={style.block}>
                <h2 className={style.title}>{title}</h2>
                <div className={style.btn__block}>
                    <Button value='ok' bgColor='green' />
                    <Button value='cancel' bgColor='red' action={close}/>
                </div>
            </div>
        </div>
    );
}

export default Popup;
