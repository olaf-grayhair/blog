import React, { FC, useEffect } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import style from './postlist.module.scss';


interface IPostTemple {
    fetchAction: any,
    page: string,
    use: string,
    someObj: {},
}

const PostTempl: React.FC<IPostTemple> = ({fetchAction, page, use, someObj}) => {
    
    const {posts, isLoading, } = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(someObj !== undefined) {
            dispatch(fetchAction(someObj))
        } else {
            dispatch(fetchAction())
        }
        
      },[use]);

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

export default PostTempl;
