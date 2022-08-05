import React, {FC} from 'react';
import UserInput from '../../UI/input/UserInput';
import style from './search.module.scss';

const Search: React.FC = () => {
    return (
        <div className={style.search}>
            <UserInput/>
        </div>
    );
}

export default Search;
