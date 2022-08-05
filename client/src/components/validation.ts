import { useEffect, useState } from "react"

export const useValidation = (validation:string, value: string) => {
    ///EMAIL
    const [emailError, setEmailError] = useState<boolean>(false)
    const [email, setEmail] = useState<boolean>(false)
    ///NAME
    const [name, setName] = useState<boolean>(false)
    const [nameError, setNameError] = useState<boolean>(false)
    ///SURNAME
    const [surname, setSurName] = useState<boolean>(false)
    const [surNameError, setSurNameError] = useState<boolean>(false)
    ///PASSWORD
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [password, setPassword] = useState<boolean>(false)


    const [inputValid, setInputValid] = useState<boolean>(false)
    const [registerValid, setRegisterValid] = useState<boolean>(false)

    useEffect(() => {
        // console.log(value, validation);
        
        switch(validation) {
            case 'email':
                const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
                !re.test(String(value).toLowerCase()) 
                ? setEmailError(true) 
                : setEmailError(false)
                break
            case 'password':
                value.length > 4 ? setPasswordError(false) : setPasswordError(true)
                break
            case 'name':
                value.length > 3 ? setNameError(false) : setNameError(true)
                break
            case 'surname':
                value.length > 3 ? setSurNameError(false) : setSurNameError(true)
                break
        }
    },[value])
    
    useEffect(() => {
        if(passwordError || emailError) {
            setInputValid(false)
        }else {            
            setInputValid(true)
        }
    }, [passwordError, emailError, inputValid])

    useEffect(() => {
        if(passwordError || emailError || nameError || surNameError) {
            setRegisterValid(false)
        }else {            
            setRegisterValid(true)
        }
    }, [passwordError, emailError, surNameError, nameError, registerValid])

    return {
        passwordError,
        password, 
        setPassword,
        emailError,
        email,
        setEmail,
        nameError,
        name,
        setName,
        surNameError,
        surname,
        setSurName,
        inputValid,
        registerValid,
    }
}

export const useInput = (initialValue: string, validation: string) => {
    const [value, setValue] = useState<string>(initialValue)

    const valid = useValidation(validation, value)
    // console.log(valid);
    
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement |HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange,
        ...valid
    }
}