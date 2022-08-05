import React, { FC, useState } from 'react';
import { Link } from "react-router-dom";
import { useInput } from '../..//hooks/valid';

import { useAppDispatch } from '../../hooks/redux';
import { fetchUserRegistration } from '../../store/actions/UserAction';
import Button from '../../UI/Button/Button';
import ErrorMsg from '../../UI/Error/ErrorMsg';
import UserInput from '../../UI/input/UserInput';
import style from './registration.module.scss';

const Registration: React.FC = () => {
    const dispatch = useAppDispatch()

    const email = useInput('', 'email')
    const password = useInput('', 'password')
    const name = useInput('', 'name')
    const surname = useInput('', 'surname')


    const Registration = () => {
        const query = {
            email: email.value,
            password: password.value,
            firstName: name.value,
            surName: surname.value
        }

        email.onClick()
        password.onClick()
        name.onReg()
        surname.onReg()

        if (email.registerValid && password.registerValid && name.registerValid && surname.registerValid) {
            dispatch(fetchUserRegistration(query))
            email.setMsgState(false) 
        }
    }

    return (
        <div className={style.registration}>
            <h2>REGISTRATION</h2>
            <div className={style.input__block}>
                <ErrorMsg name={email.message}
                    bool={email.msgState}
                    close={email.onClose}
                />

                <ErrorMsg name='wrong email'
                    bool={email.err}
                    close={email.onClose}
                />
                <UserInput
                    name='email'
                    value={email.value}
                    onChange={email.onChange}
                />

                <ErrorMsg name='wrong password'
                    bool={password.err}
                    close={password.onClose}
                />
                <UserInput
                    name='password'
                    value={password.value}
                    onChange={password.onChange}
                />

                <ErrorMsg name='bad name'
                    bool={name.err}
                    close={name.onClose}
                />
                <UserInput
                    name='name'
                    value={name.value}
                    onChange={name.onChange}
                />

                <ErrorMsg name='bad surname'
                    bool={surname.err}
                    close={surname.onClose}
                />
                <UserInput
                    name='surname'
                    value={surname.value}
                    onChange={surname.onChange}
                />
            </div>
            <div className={style.btn__block}>
                <Button value='create' action={Registration} />
                <Link to='/login'>Already have an account?</Link>
            </div>
        </div>
    );
}

export default Registration;
