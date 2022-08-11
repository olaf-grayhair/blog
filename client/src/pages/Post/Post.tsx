import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import Popup from '../../components/Popup/Popup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCommentDelete, fetchOnePost } from '../../store/actions/Comment&&OnePostAction';
import { fetchDeletePost, fetchLike } from '../../store/actions/PostAction';
import { setCommentId } from '../../store/reducers/CommentSlice';
import { showPopup, showPopupPost } from '../../store/reducers/UserSlice';
import PostOne from './PostOne';

const Post: React.FC = () => {
    const { id } = useParams() as { id: string }
    const navigate = useNavigate();

    const { like } = useAppSelector(state => state.posts)
    const { post } = useAppSelector(state => state.post)
    const {popup, popupPost, isAuth, user} = useAppSelector(state => state.users)
    const { commentId } = useAppSelector(state => state.comment)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchOnePost(id))
    }, [like]);

    const closePopup = () => {
        dispatch(showPopup(false))
        dispatch(showPopupPost(false))
    }

    const deleteComment = () => {
        dispatch(fetchCommentDelete(commentId))
        dispatch(setCommentId(''))
        dispatch(showPopup(false))
    }

    const deletePost = () => {
        dispatch(fetchDeletePost(commentId))
        dispatch(setCommentId(''))
        dispatch(showPopupPost(false))
        navigate('../', { replace: true })
    }

    const likeToogle = (postId:string) => {
        dispatch(fetchLike(postId))
    }


    return (
        <>
            {Object.keys(post).length > 1 
            ? <PostOne {...post} 
                action={likeToogle}
                isAuth={isAuth}
                userId={user._id}
                /> 
            : <Loader />}

            {popup && <Popup
                title='delete comment?'
                popup={popup}
                close={closePopup}
                action={deleteComment}
            />}

            {popupPost && <Popup
                title='delete post?'
                popup={popupPost}
                close={closePopup}
                action={deletePost}
            />}

        </>
    );
}

export default Post;
