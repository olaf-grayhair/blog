import React, { FC, useEffect } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSearchPost, fetchUserPost } from '../../store/actions/PostAction';
import style from './postlist.module.scss';

const PostSearch: React.FC<any> = () => {
    const {post, isLoading, error, postsLength} = useAppSelector(state => state.posts)
    const search = useAppSelector(state => state.users.search)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(fetchSearchPost({ title: 'title', search }))
      },[search]);

      
      if (!post.length) {
        return (
            <div>
                Постов не существует.
            </div>
        )
    }

    const postsArray = post.map(post => <PostItem key={post._id} {...post}/>)

    return (
        <div className={style.postlist}>
            {!isLoading ? postsArray : <Loader/>}
        </div>
    );
}

export default PostSearch;
