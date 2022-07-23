import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { monthFunck } from '../months';
import { URL_API } from '../url';
import style from './useritem.module.scss';
import avatar from '../../assets/user.png'

interface UserItemProps {
    timestamps: string;
    // avatarUrl?: string;
    // firstName?: string;
    // surName?: string;
    // user: object;
    // _id: string;
}

const UserItem: React.FC<UserItemProps> = ({
    timestamps, 
    // avatarUrl,
    // firstName, 
    // surName
    }) => {

    // console.log(_id);
    const {firstName, surName, avatarUrl, _id} = useAppSelector(state => state.post.user)
    

        console.log('USERITEM', firstName, surName);
        

    
    
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
