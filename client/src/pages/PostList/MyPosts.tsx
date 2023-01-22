import React, { FC, useEffect } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserPost } from '../../store/actions/PostAction';
import style from './postlist.module.scss';
import ErrorPosts from '../../UI/Error/ErrorPosts';


const MyPosts: React.FC = () => {
    
    const {posts, isLoading, } = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(fetchUserPost())
      },[]);

      if (!posts.length) {
        return (
            <ErrorPosts text='No posts'/>
        )
    }

    console.log('myposts');
    
    const postsArray = posts.map((post, id) => <PostItem key={post._id} {...post}/>)

    return (
        <div className={style.postlist}>
            {!isLoading ? postsArray : <Loader/>}
        </div>
    );
}

export default MyPosts;
