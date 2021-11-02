import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './product_detail.module.css';
const ProductDetail = (props) => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }


    const[product,setProduct] = useState({
        "product_id": '',
        "title": '',
        "location": '',
        "detail": '',
        "imgURL": '',
        "price_hour": '',
        "price_day": '',
        "type": '',
        "userId": '',
        "postUserNickname": '',
    });

    const[comment,setComment] = useState('');


    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //댓글 axios
    }


    useEffect(() => {

        console.log(history.location.props)
        axios({
            method: 'get',
            url: `/api/product/${history.location.props}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
        .then( res => {
            console.log(res);
            setProduct({
                "product_id": res.data.id,
                "title": res.data.title,
                "location": res.data.location,
                "detail": res.data.detail,
                "imgURL": res.data.imgURL,
                "price_hour": res.data.price_hour,
                "price_day": res.data.price_day,
                "type": res.data.type,
                "userId": res.data.userId,
                "postUserNickname": res.data.postUserNickname,
            })
        })
        
        
    },[])

    return (
        <div className={styles.container}>
                {/* 이미지 박스 */}
                <div className={styles.imgBox}>
                <button onClick={goBack} className={styles.goBackBtn}><i className="fas fa-arrow-left"></i></button>
                    <img 
                        className={styles.product_img}
                        src={product.imgURL}
                        alt="" 
                    />
                </div>
                <div className={styles.product_info}>
                {/* 등록자 정보 */}
                <header className={styles.userBox}>
                <div className={styles.profile_left}>
                    <button className={styles.profileImg}><i className="fas fa-user-circle"></i></button>
                </div>
                <div className={styles.product_nickneme}>
                    {/* 닉네임으로 바꿔줘야함 */}
                    <span>{product.postUserNickname}</span>
                </div>
                </header>
                {/* 상품 정보 */}
                <section className={styles.product_detail}>
                    <div className={styles.product_title}>
                        <span>{product.title}</span>
                    </div>
                    <div className={styles.location}>
                        <span>{product.location}</span>
                    </div>
                    <div className={styles.product_description}>
                        <span>{product.detail}</span>
                    </div>
                </section>
                {/* 댓글 */}
                <div className={styles.commentInputBox}>
                    <form className={styles.commentForm} onSubmit={handleSubmit}>
                        <textarea className={styles.commentInput} name="comment" type="text" placeholder="댓글을 입력해 주세요." 
                        value={comment} onChange={handleChange}/>
                        <button className={styles.commentSubmit}>댓글쓰기</button>
                    </form>
                    {/* 댓글리스트 컴포넌트로 만들어줘야함 */}
                    <div className={styles.commentList}>
                        {/* 댓글 컴포넌트로 만들어줘야함*/}
                        <div className={styles.commentItem}>
                            <div className={styles.commentWriter}>
                                댓글 작성자
                            </div>
                            <div className={styles.comment}>
                                <div className={styles.commentData}>
                                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                                </div>
                            <div className={styles.commentUpdate}>
                                <button className={styles.commentUpdateBtn}> 수정</button>
                                <button className={styles.commentDeleteBtn}> 삭제</button>
                            </div>
                            </div>
                        </div>

                        <div className={styles.commentItem}>
                            <div className={styles.commentWriter}>
                                댓글 작성자
                            </div>
                            <div className={styles.comment}>
                                <div className={styles.commentData}>
                                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                                </div>
                            <div className={styles.commentUpdate}>
                                <button className={styles.commentUpdateBtn}> 수정</button>
                                <button className={styles.commentDeleteBtn}> 삭제</button>
                            </div>
                            </div>
                        </div>

                        <div className={styles.commentItem}>
                            <div className={styles.commentWriter}>
                                댓글 작성자
                            </div>
                            <div className={styles.comment}>
                                <div className={styles.commentData}>
                                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                                </div>
                            <div className={styles.commentUpdate}>
                                <button className={styles.commentUpdateBtn}> 수정</button>
                                <button className={styles.commentDeleteBtn}> 삭제</button>
                            </div>
                            </div>
                        </div>

                        <div className={styles.commentItem}>
                            <div className={styles.commentWriter}>
                                댓글 작성자
                            </div>
                            <div className={styles.comment}>
                                <div className={styles.commentData}>
                                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                                </div>
                            {/* 해당하는 userId에서만 보이게해줘야함. */}
                            <div className={styles.commentUpdate}>
                                <button className={styles.commentUpdateBtn}> 수정</button>
                                <button className={styles.commentDeleteBtn}> 삭제</button>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );


};

export default ProductDetail;