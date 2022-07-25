import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { showMenu } from '../../store/reducers/UserSlice';
import style from './user.module.scss';

const UserSetting: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(showMenu(false))
      },[]);


    return (
        <div className={style.usersetting}>
            SETTINGS
        </div>
    );
}

export default UserSetting;
