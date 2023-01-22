import React, { FC } from 'react';
import Sort from '../components/Sort/Sort';
import style from './home.module.scss';
import Tags from '../components/Tags/Tags';
import { useLocation, Outlet, useSearchParams, useParams } from "react-router-dom";
import queryString from 'query-string';
import PostList from './PostList/PostList';

const Home: React.FC = () => {
    const location = useLocation();
    // console.log(location.pathname, 'location');
    // console.log(window.location, 'location.search');
    // const [searchParams, setSearchParams] = useSearchParams({});
    // console.log(searchParams, 'router-dom search');
    const params = useParams();

    // console.log(params, 'params');

    const parsed = queryString.parse(location.search);
    // console.log(parsed);
    

    return (
        <div className={style.home}>
            <Sort />
            <div className={style.contaiter}>
                <Outlet />
                <Tags />
            </div>
        </div>
    );
}

export default Home;
