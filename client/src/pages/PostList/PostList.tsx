import React, { FC, useEffect } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPosts } from '../../store/actions/PostAction';
import style from './postlist.module.scss';
import { Outlet } from 'react-router-dom';


const PostList: React.FC<any> = () => {
    const {posts, isLoading, error, postsLength} = useAppSelector(state => state.posts)
    const readingList = useAppSelector(state => state.users.user.readingList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
        console.log('readingList');
      },[]);

      if (!posts.length) {
        return (
            <div>
                Постов не существует.
            </div>
        )
    }

    const postsArray = posts.map((post, id) => <PostItem key={post._id} {...post}/>)

    return (
        <div className={style.postlist}>
            {!isLoading ? postsArray : <Loader/>}
        </div>
    );
}

export default PostList;
