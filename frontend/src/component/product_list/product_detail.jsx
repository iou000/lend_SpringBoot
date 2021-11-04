import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CommentList from '../comment/comment_list';
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

    const[commentInput,setCommentInput] = useState('');


    const commentChange = (e) => {
        setCommentInput(e.target.value)
    }

    const commentSubmit = (e) => {
        e.preventDefault();
        console.log(commentInput);
        console.log(product.product_id)
        axios({
            method: 'post',
            url: `/api/product/${product.product_id}/comment`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            },
            data: {
                "content": commentInput,
            }
        })
        .then(res => console.log(res))
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
            console.log(res.data);
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
                </div>
                {/* 댓글 */}
                <CommentList commentInput={commentInput} commentChange={commentChange} commentSubmit={commentSubmit}/>
        </div>

    );


};

export default ProductDetail;