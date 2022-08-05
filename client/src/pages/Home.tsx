import React, { FC } from 'react';
import Sort from '../components/Sort/Sort';
import PostList from './PostList/PostList';
import style from './home.module.scss';
import Tags from '../components/Tags/Tags';

const Home: React.FC = () => {


    return (
        <div className={style.home}>
            <Sort />
            <div className={style.contaiter}>
                <PostList />
                <Tags />
            </div>
        </div>
    );
}

export default Home;
