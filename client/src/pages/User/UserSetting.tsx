import React, { FC, useEffect } from 'react';
import { useInput } from '../../hooks/input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { showMenu } from '../../store/reducers/UserSlice';
import FileInput from '../../UI/input/FileInput';
import UserInput from '../../UI/input/UserInput';
import logo from '../../assets/user.png'
import style from './user.module.scss';
import Button from '../../UI/Button/Button';
import { fetchUserSetting, uploadAvatar } from '../../store/actions/UserAction';
import { useNavigate } from 'react-router-dom';
import { imageState } from '../../components/imgState';

const UserSetting: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const { firstName, surName, email, avatarUrl } = useAppSelector(state => state.users.user)

    useEffect(() => {
        dispatch(showMenu(false))
    }, []);

    const name = useInput(firstName)
    const surname = useInput(surName)
    const userEmail = useInput(email)
    const avatar = useAppSelector(state => state.users.avatar)
    
    function sendImg(e: React.ChangeEvent<HTMLInputElement>) {
        let file: any = e.target.files?.[0];
        dispatch(uploadAvatar(file))
    }

    const update = () => {
        const body = {
            email: userEmail.value,
            firstName: name.value,
            surName: surname.value,
            avatarUrl: avatar
        }
        dispatch(fetchUserSetting(body))
        navigate('../', { replace: true })
    }

    const close = () => {
        navigate('../', { replace: true })
    }

    return (
        <div className={style.userinfo}>
            <div className={style.user__setting}>
                <h2 className={style.title}>User setting</h2>
                <div className={style.user__input}>
                    <UserInput
                        value={userEmail.value}
                        type='text'
                        name='email'
                        onChange={userEmail.onChange}
                    />
                    <UserInput
                        value={name.value}
                        type='text'
                        name='name'
                        onChange={name.onChange}
                    />
                    <UserInput
                        value={surname.value}
                        type='text'
                        name='surname'
                        onChange={surname.onChange}
                    />
                </div>
                <label className={style.label} htmlFor="">Profile image</label>
                <div className={style.file__upload}>
                    <img 
                        src={imageState(avatarUrl, avatar, logo)} 
                        alt={logo} 
                        className={style.upload} 
                    />
                    <FileInput name='upload avatar' onChange={sendImg} />
                </div>
                <div className={style.btn__block}>
                    <Button value='save' bgColor='green' action={update} />
                    <Button value='close' bgColor='red' action={close}/>
                </div>
            </div>
        </div>
    );
}

export default UserSetting;
