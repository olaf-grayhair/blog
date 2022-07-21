import React, { FC } from 'react';
import { Plane } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import style from './loader.module.scss';


const Loader: React.FC = () => {
    return (
        <div className={style.loader}>
            <Plane ariaLabel="loading-indicator" color='white' />
        </div>
    );
}

export default Loader;
