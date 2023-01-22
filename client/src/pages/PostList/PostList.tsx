import React, { useCallback, useEffect, useRef, useState } from 'react';
import PostItem from './PostItem/PostItem';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPosts } from '../../store/actions/PostAction';
import style from './postlist.module.scss';


const PostList: React.FC = () => {
    const { posts, isLoading, error, totalPages, currentPage } = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()

    const myRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const observer = useRef<IntersectionObserver | null>(null);

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false);

    useEffect(() => {
        setHasMore(totalPages > page)
        
        dispatch(fetchPosts({ sortItem: '', page: page, limit: posts.length }))
    }, [page]);


    const lastBookElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && page < totalPages) {
                
                setPage(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [isLoading, hasMore])

    /////
    const postsArray = posts.map((post, id) =>
        <PostItem key={post._id} {...post} />
    )

    return (
        <div className={style.postlist}>
            {!isLoading
                ? <>
                    {postsArray}
                    <div ref={lastBookElementRef} style={{ background: 'red' }}>
                    </div>
                </>
                : <Loader />
            }


        </div>
    );
}

export default PostList;
