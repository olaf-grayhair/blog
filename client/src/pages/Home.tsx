import React, { FC } from 'react';
import Sort from '../components/Sort/Sort';
import PostList from './PostList/PostList';
import style from './home.module.scss';
import Tags from '../components/Tags/Tags';
import PostTags from './PostList/PostsTags';
import PostSearch from './PostList/PostsSearch';
import { BrowserRouter, Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";

const Home: React.FC = () => {
    const location = useLocation();
    console.log(location.pathname, 'location');
    
    return (
        <div className={style.home}>
            <Sort />
            <div className={style.contaiter}>
                <Outlet/>
                <Tags />
            </div>
        </div>
    );
}

export default Home;
