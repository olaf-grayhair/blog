import React, { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import Popup from '../../components/Popup/Popup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCommentDelete, fetcPostComments } from '../../store/actions/CommentAction';
import { fetchLike, fetchOnePost } from '../../store/actions/PostAction';
import { showPopup } from '../../store/reducers/UserSlice';
import PostOne from './PostOne';

const Post: React.FC = () => {
    const { id } = useParams() as { id: string }

    const { isLoading, error, post } = useAppSelector(state => state.post)
    const popup = useAppSelector(state => state.users.popup)
    const {commentId, comments} = useAppSelector(state => state.comment)
    const dispatch = useAppDispatch()

    // let a = comments.filter(el => el._id === commentId)
    // console.log(commentId);
    // console.log(a, 'A');
    
    
    useEffect(() => {
        dispatch(fetchOnePost(id))
        dispatch(fetcPostComments(id))
    }, []);

    const closePopup = () => {
        dispatch(showPopup(false))
    }

    const deleteComment = () => {
        dispatch(fetchCommentDelete(commentId))
        dispatch(showPopup(false))
    }

    const likeToogle = (postId:string) => {
        dispatch(fetchLike(postId))
    }

    return (
        <>
            {/* <PostOne {...post}/> */}
            {!isLoading ? <PostOne {...post} action={likeToogle}/> : <Loader />}
            {popup && <Popup
                title='delete comment?'
                popup={popup}
                close={closePopup}
                action={deleteComment}
            />}

        </>
    );
}

export default Post;
