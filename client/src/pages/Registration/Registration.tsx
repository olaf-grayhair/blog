import React, {FC, useState} from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../hooks/redux';
import { fetchUserRegistration } from '../../store/actions/UserAction';
import Button from '../../UI/Button/Button';
import Input from '../../UI/input/Input';
import style from './registration.module.scss';

const Registration: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setName] = useState<string>("");
    const [surName, setSurName] = useState<string>("");
    const dispatch = useAppDispatch()

    const Registration = () => {
        const query = {email, password, firstName, surName}

        dispatch(fetchUserRegistration(query))
    }

    return (
        <div className={style.registration}>
            <h2>REGISTRATION</h2>
            <div className={style.input__block}>
                <Input value='email' setEmail={setEmail}/>
                <Input value='password' setPassword={setPassword}/>
                <Input value='name' setName={setName}/>
                <Input value='surname' setSurName={setSurName}/>
            </div>
            <div className={style.btn__block}>
                <Button value='create' action={Registration}/>
                <Link to='/login'>Already have an account?</Link>
            </div>
        </div>
    );
}

export default Registration;
