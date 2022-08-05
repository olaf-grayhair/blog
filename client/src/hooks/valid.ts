import { useEffect, useState } from "react"
import { useAppSelector } from './redux';

export const useValidation = (validation:string, value: string) => {
    ///EMAIL
    const [emailError, setEmailError] = useState<boolean>(false)
    ///PASSWORD
    const [passwordError, setPasswordError] = useState<boolean>(false)
    ///NAME
    const [nameError, setNameError] = useState<boolean>(false)
    ///SURNAME
    const [surNameError, setSurNameError] = useState<boolean>(false)
    ///CHECK LOGIN
    const [inputValid, setInputValid] = useState<boolean>(false)
    ///CHECK REGISTER
    const [registerValid, setRegisterValid] = useState<boolean>(false)
    useEffect(() => {
        switch(validation) {
            case 'email':
                const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
                !re.test(String(value).toLowerCase()) 
                ? setEmailError(true) 
                : setEmailError(false)
                break
            case 'password':
                value.length > 4 && value.length < 8? setPasswordError(false) : setPasswordError(true) 
                break
            case 'name':
                value.length > 3 && /^[a-zA-Z]+$/.test(String(value)) ? setNameError(false) : setNameError(true)
                break
            case 'surname':
                value.length > 3 && /^[a-zA-Z]+$/.test(String(value)) ? setSurNameError(false) : setSurNameError(true)
                break
        }
    },[value])

    ///CHECK LOGIN
    useEffect(() => {
        if(passwordError || emailError) {
            setInputValid(false)
        }else {            
            setInputValid(true)
        }
    }, [passwordError, emailError, inputValid])

    ///CHECK REGISTER
    useEffect(() => {
        if(passwordError || emailError || nameError || surNameError) {
            setRegisterValid(false)
        }else {            
            setRegisterValid(true)
        }
    }, [passwordError, emailError, nameError, surNameError, registerValid])


    return {
        passwordError,
        emailError,
        nameError,
        surNameError,
        inputValid,
        registerValid
    }
}


export const useInput = (initialValue: string, validation: string) => {
    ///input logic
    const [value, setValue] = useState<string>(initialValue)

    const valid = useValidation(validation, value)
    
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement |HTMLInputElement>) => {
        setValue(e.target.value)
    }

    ///validation logic
    const [err, setErr] = useState<boolean>(true)

    ///email && password check
    const onClick = () => {
        if (!valid.passwordError && !valid.emailError) setErr(true)
        else setErr(false)
    }
    ///name && surname check
    const onReg = () => {
        if (!valid.nameError && !valid.surNameError) setErr(true)
        else setErr(false)
    }
    ///close error message
    const onClose = () => {
        setErr(true)
        setMsgState(true)
    }
    ///login error || auth error
    const [msgState, setMsgState] = useState<boolean>(true)

    const { message } = useAppSelector(state => state.users)
    const checkMsg = message.split(' ', 1).pop()

    useEffect(() => {
        if(checkMsg === 'user' || checkMsg === 'password') {
            setMsgState(false) 
        }
    }, [checkMsg])
    
    return {
        value,
        onChange,
        onClick,
        onClose,
        err,
        onReg,

        checkMsg,
        message,
        msgState,
        setMsgState,

        ...valid
    }
}