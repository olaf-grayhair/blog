import React, { FC, useEffect } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSearchPost } from '../../store/actions/PostAction';
import style from './postlist.module.scss';
import { useParams } from 'react-router-dom';


const PostTags: React.FC<any> = () => {
    const { id } = useParams() as { id: string }
    const {post, isLoading, error, totalPages} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(fetchSearchPost({ title: 'tags', search: id }))
      },[id]);

      if (!post.length) {
        return (
            <div>
                Постов не существует.
            </div>
        )
    }

    const postsArray = post.map(el => <PostItem key={el._id} {...el}/>)

    return (
        <div className={style.postlist}>
            {!isLoading ? postsArray : <Loader/>}
        </div>
    );
}

export default PostTags;
