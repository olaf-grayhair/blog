import React, {FC, useState} from 'react';
import { useNavigate } from "react-router-dom"
import { useInput } from '../../hooks/input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createPost, uploaFile } from '../../store/actions/PostAction';
import Button from '../../UI/Button/Button';
import style from './createpost.module.scss';

const CreatePost: React.FC = () => {
    const dispatch = useAppDispatch()
    const {imageUrl} = useAppSelector(state => state.posts)
    const title = useInput('')
    const tags = useInput('')
    const text = useInput('')

    const navigate = useNavigate();
    const sendPost = () => {
        const body = {
            title: title.value,
            tags: tags.value,
            text: text.value,
            imageUrl
        }
        // const formData = new FormData()
        // formData.append('title', title)
        // formData.append('tags', tags)
        // formData.append('text', text)
        // formData.append('imageUrl', imageUrl)
        // console.log(formData);
        
        dispatch(createPost(body))
        navigate('../', { replace: true })
    }

    function sendImg(e: React.ChangeEvent<HTMLInputElement>) {
        let file: any = e.target.files?.[0]; 
        dispatch(uploaFile(file))
        dispatch(uploaFile({body:file, id: ''}))
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
            <img className={style.poster} src={imageUrl === '' ? 'No image' : imageUrl} alt="" />
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
            <Button value='publish' bgColor='gray' action={sendPost}/>
        </div>
    );
}

export default CreatePost;
