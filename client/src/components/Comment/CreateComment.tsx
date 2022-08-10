import React, {FC, useState} from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { fetcCommentCreate } from '../../store/actions/Comment&&OnePostAction';
import Button from '../../UI/Button/Button';
import style from './comment.module.scss';



const CreateComment: React.FC<{ _id: string; }> = ({_id}) => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>('')

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        setText(e.target.value)
    };
    // console.log(_id, 'userID');
    
    const sendComment = () => {
        const body = {text: text, id: _id}
        dispatch(fetcCommentCreate(body))
        setText('')
    }

    return (
        <div className={style.createcomment}>
            <textarea className={style.textarea}
             value={text} 
             onChange={handleChange}
             ></textarea>
            <Button value='submit' bgColor='gray' action={sendComment}/>
        </div>
    );
}

export default CreateComment;
