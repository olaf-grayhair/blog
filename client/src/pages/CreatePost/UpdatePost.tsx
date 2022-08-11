import React, {FC, useState} from 'react';
import { useNavigate } from "react-router-dom"
import { imageState } from '../../components/imgState';
import { useInput } from '../../hooks/input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createPost, updatePost, uploaFile } from '../../store/actions/PostAction';
import Button from '../../UI/Button/Button';
import style from './createpost.module.scss';

const UpdatePost: React.FC = () => {
    const dispatch = useAppDispatch()
    const {post} = useAppSelector(state => state.post)
    const {imageUrl} = useAppSelector(state => state.posts)
    const title = useInput(post.title)
    const tags = useInput(post.tags.join())
    const text = useInput(post.text)

    console.log(post._id, 'post');
    
    const navigate = useNavigate();
    const sendPost = () => {
        const body = {
            title: title.value,
            tags: tags.value,
            text: text.value,
            imageUrl
        }
   
        dispatch(updatePost({body, id: post._id}))
        navigate('../', { replace: true })
    }

    function sendImg(e: React.ChangeEvent<HTMLInputElement>) {
        let file: any = e.target.files?.[0]; 
        console.log(file);
        dispatch(uploaFile({body:file, id: post._id}))
        // dispatch(uploadAvatar(file))
    }

    return (
        <div className={style.createpost}>
            <div className={style.image__block}>
                <label className={style.upload__label}>
                    Add a cover image
                    <input type='file'
                        className={style.upload__input}
                        accept='image/*'
                        placeholder='write your title here...'
                        onChange={sendImg}
                    />
                </label>
            </div>
            <img className={style.poster} 
                src={imageState(post.imageUrl, imageUrl, 'No img')}
                alt="" />
                
            <div className={style.input__block}>
                <label htmlFor="name">Title</label>
                <input className={style.input} type='text' placeholder='write your title here...'
                onChange={title.onChange}
                value={title.value}
                 />
            </div>
            <div className={style.tags__block}>
                <label htmlFor="name">Tags</label>
                <input className={style.input} type='text' 
                placeholder='Add up to 4 tags...'
                onChange={tags.onChange}
                value={tags.value}
                />
            </div>
            <div className={style.text__block}>
                <label htmlFor="name">Title</label>
                <textarea className={style.textarea} placeholder='write your post content here...'
                onChange={text.onChange}
                value={text.value}
                ></textarea>
            </div>
            <Button value='edit' bgColor='gray' action={sendPost}/>
        </div>
    );
}

export default UpdatePost;
