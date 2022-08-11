import React, { useEffect } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPosts } from '../../store/actions/PostAction';
import style from './postlist.module.scss';

const PostList: React.FC = () => {
    const {posts, isLoading, error, postsLength} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
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
