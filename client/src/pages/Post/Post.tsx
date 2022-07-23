import React, { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetcPostComments } from '../../store/actions/CommentAction';
import { fetchOnePost } from '../../store/actions/PostAction';
import PostOne from './PostOne';

const Post: React.FC = () => {
    const { id } = useParams() as { id: string}

    const {isLoading, error, post, user } = useAppSelector(state => state.post)
    const dispatch = useAppDispatch()
    


    useEffect(() => {
        

        dispatch(fetchOnePost(id))
        dispatch(fetcPostComments(id))
      },[]);
    
    return (
        <>
            {/* <PostOne {...post}/> */}
            {!isLoading ? <PostOne {...post}/> : <Loader/>}
        </>
    );
}

export default Post;
