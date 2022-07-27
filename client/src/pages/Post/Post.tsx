import React, { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import Popup from '../../components/Popup/Popup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetcPostComments } from '../../store/actions/CommentAction';
import { fetchOnePost } from '../../store/actions/PostAction';
import { showPopup } from '../../store/reducers/UserSlice';
import PostOne from './PostOne';

const Post: React.FC = () => {
    const { id } = useParams() as { id: string }

    const { isLoading, error, post } = useAppSelector(state => state.post)
    const popup = useAppSelector(state => state.users.popup)
    const dispatch = useAppDispatch()



    useEffect(() => {
        dispatch(fetchOnePost(id))
        dispatch(fetcPostComments(id))
    }, []);

    const closePopup = () => {
        dispatch(showPopup(false))
    }

    return (
        <>
            {/* <PostOne {...post}/> */}
            {!isLoading ? <PostOne {...post} /> : <Loader />}
            {popup && <Popup
                title='delete comment?'
                popup={popup}
                close={closePopup}
            />}

        </>
    );
}

export default Post;
