import React, {FC, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { uploaFile } from '../../store/actions/PostAction';
import Button from '../../UI/Button/Button';
import style from './createpost.module.scss';

const CreatePost: React.FC = () => {
    const dispatch = useAppDispatch()
    const {url} = useAppSelector(state => state.posts)
    const [title, setTitle] = useState<string>('')
    const [tags, setTags] = useState<string>('')
    const [text, setText] = useState<string>('')

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        setTitle(e.target.value)
    };

    const sendComment = () => {
        const body = {
            title,
            tags,
            text,
            url
        }

        setTitle('')
    }

    // const sendImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     let file = e.target.files;
    //     uploadAvatar(file)
    // }

    function sendImg(e: React.ChangeEvent<HTMLInputElement>) {
        let file: any = e.target.files?.[0]; 
        console.log(file);
        dispatch(uploaFile(file))
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
                        // onClick={sendImg}
                    />
                </label>
            </div>
            <img className={style.poster} src={url === '' ? 'No image' : url} alt="" />
            <div className={style.input__block}>
                <label htmlFor="name">Title</label>
                <input className={style.input} type='text' placeholder='write your title here...' />
            </div>
            <div className={style.tags__block}>
                <label htmlFor="name">Tags</label>
                <input className={style.input} type='text' placeholder='Add up to 4 tags...' />
            </div>
            <div className={style.text__block}>
                <label htmlFor="name">Title</label>
                <textarea className={style.textarea} placeholder='write your post content here...'></textarea>
            </div>
            <Button value='publish' bgColor='gray'/>
        </div>
    );
}

export default CreatePost;
