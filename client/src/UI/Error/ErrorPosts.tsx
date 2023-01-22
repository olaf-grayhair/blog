import React, {FC} from 'react';
import style from './error.module.scss';

const ErrorPosts: React.FC<{text:string}> = ({text}) => {
    return (
        <div className={style.errPost}>
            <h1>{text}</h1>
        </div>
    );
}

export default ErrorPosts;
