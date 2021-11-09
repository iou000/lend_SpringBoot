import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CommentList from '../comment/comment_list';
import styles from './product_detail.module.css';
const ProductDetail = (props) => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    //리액트 라우터로 연결해준 상품 Id (url)
    const productId = parseInt(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1));

    //상품 정보
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
    
    //상품에 달린 댓글 정보
    const[comments,setComments] = useState([]);


    const[commentInputText,setCommentInputText] = useState('');


    const commentChange = useCallback((e) => {
        setCommentInputText(e.target.value)
    },[])



    const commentSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `/api/product/${product.product_id}/comment`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            },
            data: {
                "content": commentInputText,
            }
        })
        .then(res => {
            alert('댓글 작성 성공!!');
            window.location.replace(`/product/${productId}`);
        })
        .catch(error => alert('댓글 작성 실패..'))
    };


    useEffect(() => {
        axios({
            method: 'get',
            url: `/api/product/${productId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
        .then(res => {
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
            });
            setComments(res.data.comments);
        })

        
        
    },[productId])



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
                        <div className={styles.postUser_nickneme}>
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
                </div>

                {/* 댓글 */}
                <CommentList comments={comments}/>
                {/* 댓글 입력 폼 */}
                <form className={styles.commentForm} onSubmit={commentSubmit}>
                    <textarea className={styles.commentInput} name="comment" type="text" placeholder="댓글을 입력해 주세요." 
                    value={commentInputText} onChange={commentChange}/>
                    <button className={styles.commentSubmitBtn}>댓글쓰기</button>
                </form>
        </div>

    );


};

export default ProductDetail;