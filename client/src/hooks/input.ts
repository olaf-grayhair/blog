import { useState } from "react"


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