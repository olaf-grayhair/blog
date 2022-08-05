import React, { FC } from 'react';
import style from './input.module.scss';

interface IFileInput {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FileInput: React.FC<IFileInput> = ({name, onChange}) => {

    
    return (
        <div className={style.file__input}>
            <label className={style.upload__label}>
                {name}
                <input type='file'
                    className={style.upload__input}
                    accept='image/*'
                    onChange={onChange}
                />
            </label>
        </div>
    );
}

export default FileInput;
