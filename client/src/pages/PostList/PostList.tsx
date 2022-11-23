import React, { useEffect, useRef, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';
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

    useEffect(() => {
        // if (fetching) {
        //     dispatch(fetchPosts({ sortItem: '', page: page }))
        //     console.log('fetching', page);

        // }
        // setFetching(false)
        console.log('postLIST');

        dispatch(fetchPosts({ sortItem: '', page: page }))
    }, [page]);

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        var callback = function (entries: any, observer: any) {
            if (entries[0].isIntersecting && page < totalPages) {
                console.log(page);
                setPage(page + 1)
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(myRef.current)
    }, [isLoading]);

    //   if (!posts.length) {
    //     return (
    //         <div>
    //             Постов не существует.
    //         </div>
    //     )
    // }

    ////pagination
    const getPagesArray = () => {
        let result = [];
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1)
        }
        return result;
    }

    const onClick = (num: number) => {
        // dispatch(fetchPosts({ sortItem: '', page: num }))
        setPage(page + 1)
        console.log(num, 'page');

    }
    /////
    const postsArray = posts.map((post, id) => <PostItem key={post._id} {...post} />)

    return (
        <div className={style.postlist}>
            <div style={{ display: 'flex' }}>
                {getPagesArray().map(el => <li style={{ padding: '10px', cursor: 'pointer' }} key={Math.random()} onClick={() => onClick(el)}>{el}</li>)}
            </div>
            {!isLoading
                ? <>
                    {postsArray}
                    <div ref={myRef} style={{ background: 'red' }}>
                        Have you scrolled down here yet? ????
                    </div>
                </>
                : <Loader />}


        </div>
    );
}

export default PostList;
