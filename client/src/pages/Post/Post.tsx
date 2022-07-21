import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getOnePost } from '../../store/actions/PostAction';
import style from './post.module.scss';

const Post: React.FC = () => {
    const post = useAppSelector(state => state.posts.posts)

    console.log(post);
    
    return (
        <div className={style.post}>
            <div className={style.post__item}>
                <div className={style.left__block}>
                    <div className={style.details__block}>
                        <span>like</span>
                        <button>save</button>
                    </div>
                </div>
                <div className={style.centre__block}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2015_MCAS_Beaufort_Air_Show_041215-M-CG676-161.jpg/1200px-2015_MCAS_Beaufort_Air_Show_041215-M-CG676-161.jpg" alt="" />
                    <div className={style.text__block}>
                        <div className={style.top__block}>
                            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ea1OGrCb--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png" alt="avatart" className={style.avatar} />
                            <div className={style.user__block}>
                                <span>name</span>
                                <span>jul 21</span>
                            </div>
                        </div>
                        <div className={style.content__block}>
                            <h2>title</h2>
                            <div className={style.tags__block}>
                                <span className={style.tags}>#tags</span>
                                <span className={style.tags}>#tags</span>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laudantium ipsa id odio distinctio impedit, doloremque maiores neque. Illum ipsa pariatur dolorum voluptatem similique quam quas nemo iusto incidunt quo?
                                Soluta sapiente reprehenderit porro expedita laboriosam, fugit suscipit molestias deleniti nesciunt deserunt tempora dicta iure quibusdam fugiat consequuntur totam ipsa minus commodi dolorum rem, laudantium qui molestiae reiciendis magni? Officia!
                                Doloremque reiciendis perferendis consectetur beatae, quam nemo quod ipsa maiores autem dolor corrupti necessitatibus. Pariatur aut id similique consequuntur eum, nulla earum nostrum mollitia et culpa dolorem rerum reprehenderit dolor.
                                Numquam nam nihil quisquam veritatis deleniti. Amet facilis magnam beatae eius nihil voluptates unde quam, perspiciatis obcaecati, eos error ullam quod assumenda saepe blanditiis temporibus mollitia aliquam soluta autem. Debitis?</p>

                        </div>
                    </div>
                </div>
                <div className={style.right__block}>
                    user info
                </div>
            </div>
        </div>
    );
}

export default Post;
