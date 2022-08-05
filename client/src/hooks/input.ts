import { useState } from "react"

export const useValidation = (validation:string, value: string) => {
    const [emailError, setEmailError] = useState<string>('')
    const [minLength, setMinLength] = useState<string>('')

    switch(validation) {
        case 'email':
            const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            re.test(String(value).toLowerCase()) 
            ? setEmailError('write correct email !') 
            : setEmailError('')
            break
        case 'minLength':
            value.length < 6 ? setMinLength('password is too short !') : setMinLength('')
            break
        case 'name':
            value.length < 3 ? setMinLength('name is too short !') : setMinLength('')
            break
    }

    return {
        emailError,
        minLength
    }
}

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState<string>(initialValue)
    
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement |HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange,
    }
}