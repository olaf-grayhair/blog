import React, { FC, useEffect } from 'react';
import { useInput } from '../../hooks/input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { showMenu } from '../../store/reducers/UserSlice';
import FileInput from '../../UI/input/FileInput';
import Input from '../../UI/input/Input';
import UserInput from '../../UI/input/UserInput';
import logo from '../../assets/user.png'
import style from './user.module.scss';
import Button from '../../UI/Button/Button';
import { uploaFile } from '../../store/actions/PostAction';
import { fetchUserSetting } from '../../store/actions/UserAction';
import { useNavigate } from 'react-router-dom';

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
    const { imageUrl } = useAppSelector(state => state.posts)
    const avatar = useAppSelector(state => state.users.user.avatarUrl)

    function sendImg(e: React.ChangeEvent<HTMLInputElement>) {
        let file: any = e.target.files?.[0];
        console.log(file);
        dispatch(uploaFile(file))
    }

    const update = () => {
        const body = {
            email: userEmail.value,
            firstName: name.value,
            surName: surname.value,
            avatarUrl: imageUrl
        }
        dispatch(fetchUserSetting(body))
        navigate('../', { replace: true })
    }

    const avatarSetting = () => {
        if (avatar === '') {
            return logo
        }
        if (imageUrl) {
            return imageUrl
        }
        if (!imageUrl) {
            return avatar
        }
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
                    <img src={avatarSetting()} alt="" className={style.upload} />
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
