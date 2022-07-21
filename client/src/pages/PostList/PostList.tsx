import React, { FC, useEffect } from 'react';
import PostItem from '../../components/PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getPosts } from '../../store/actions/PostAction';
import style from './postlist.module.scss';


const PostList: React.FC = () => {
    const {posts, isLoading, error} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()
    // console.log(posts[0]._id);
    
    useEffect(() => {
        dispatch(getPosts())
        console.log('effect');
        
      },[]);

    const postsArray = posts.map((post, id) => <PostItem key={post._id} {...post}/>)

    return (
        <div className={style.postlist}>
            {!isLoading ? postsArray : <Loader/>}
        </div>
    );
}

export default PostList;
