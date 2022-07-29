import React, {FC} from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { fetchPosts } from '../../store/actions/PostAction';
import style from './sort.module.scss';

interface ISort {
    setSort?: () => void;
  }

const Sort: React.FC = () => {
    const sortArray = ['likes', 'date', 'comments']
    const dispatch = useAppDispatch()
    
    const setSort = (el:string) => {
        // dispatch(fetchPosts(el))
        console.log(el);
        
    }///FIX
    return (
        <div className={style.sort}>
            {sortArray.map((el, index) => 
            <li key={el + index} onClick={e => dispatch(fetchPosts(el)) }>{el}</li>)}
        </div>
    );
}

export default Sort;
