import React, { useEffect } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import style from './postlist.module.scss';
import { fetchSavedArticle } from '../../store/actions/PostAction';
import ErrorPosts from '../../UI/Error/ErrorPosts';


const MyPosts: React.FC = () => {
    
    const {posts, isLoading, error, totalPages} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(fetchSavedArticle())
      },[]);

      if (!posts.length) {
        return (
            <ErrorPosts text='Your reading list is empty'/>
        )
    }

    const postsArray = posts.map((post, id) => <PostItem key={post._id} {...post}/>)

    return (
        <div className={style.postlist}>
            {!isLoading ? postsArray : <Loader/>}
        </div>
    );
}

export default MyPosts;
