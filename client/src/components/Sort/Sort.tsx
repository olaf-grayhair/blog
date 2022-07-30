import React, {FC, useState} from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { fetchPosts } from '../../store/actions/PostAction';
import style from './sort.module.scss';

interface ISort {
    setSort?: () => void;
  }

const Sort: React.FC = () => {
    const sortArray = ['date', 'likes', 'comments']
    const [color, setColor] = useState<number | undefined>(0)
    const dispatch = useAppDispatch()
    
    const setSort = (el?: string, index?: number) => {
        dispatch(fetchPosts(el))
        setColor(index)
    }

    return (
        <div className={style.sort}>
            {sortArray.map((el, index) => 
            <li className={index !== color ? style.item : style.active} key={el + index} 
            onClick={e => setSort(el, index)}
            // onClick={e => dispatch(fetchPosts(el)) }
            >{el}</li>)}
        </div>
    );
}

export default Sort;
