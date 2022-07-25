import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { monthFunck } from '../months';
import style from './useritem.module.scss';
import { URL_API } from '../url';
import avatar from '../../assets/user.png'
import { IUser } from '../../types/types';

interface UserItemProps {
    timestamps: string;
    avatarUrl?: string;
    firstName?: string;
    surName?: string;

    // _id: string;
}

const UserItem: React.FC<UserItemProps> = ({
    timestamps, 
    avatarUrl,
    firstName, 
    surName
    }) => {

    
    return (
        <div className={style.useritem}>
            <img src={avatarUrl ? URL_API + avatarUrl : avatar} 
            alt="avatar" className={style.avatar} />
            <div className={style.user__block}>
                <span>{firstName + ' ' + surName}</span>
                <time dateTime={timestamps}>{monthFunck(timestamps)}</time>
            </div>
        </div>
    );
}

export default UserItem;
