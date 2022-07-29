import React, {FC} from 'react';
import Sort from '../components/Sort/Sort';
import PostList from './PostList/PostList';
import style from './home.module.scss';

const Home: React.FC = () => {


    return (
        <div className={style.home}>
            <Sort/>
            <PostList/>
        </div>
    );
}

export default Home;
