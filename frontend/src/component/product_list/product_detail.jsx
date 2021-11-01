import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './product_detail.module.css';
const ProductDetail = (props) => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }


    const[product,setProduct] = useState({});

    const[comment,setComment] = useState('');


    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //댓글 axios
    }


    useEffect(() => {

        const productId = parseInt(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1));
        fetch(process.env.PUBLIC_URL + "/static/data_sample.json") // /api/search/{productId} 로 get요청 해줘야함.
        .then(res => res.json())
        .then(data => data.products)
        .then(products => {
            const product = products.filter(item => { //서버에서 처리해줘야함.
                if(item.id === productId){
                    return item;
                }
            })
            setProduct(product[0]);
        })

        // axios({
        //     method: 'get',
        //     url: `api/product/${productId}`,
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        
    },[])

    return (
        <div className={styles.container}>
                {/* 이미지 박스 */}
                <div className={styles.imgBox}>
                <button onClick={goBack} className={styles.goBackBtn}><i className="fas fa-arrow-left"></i></button>
                    <img 
                        className={styles.product_img}
                        src="https://res.cloudinary.com/diuhf2vfm/image/upload/v1635780568/1_3_rifgok.jpg" 
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
                    <span>{product.member}</span>
                </div>
                </header>
                {/* 상품 정보 */}
                <section className={styles.product_detail}>
                    <div className={styles.product_title}>
                        <span>{product.product_name}</span>
                    </div>
                    <div className={styles.location}>
                        <span>{product.gu}</span>
                    </div>
                    <div className={styles.product_description}>
                        <span>{product.product_description}</span>
                    </div>
                </section>
                {/* 댓글 */}
                <div className={styles.commentBox}>
                    <form className={styles.commentForm} onSubmit={handleSubmit}>
                        <textarea className={styles.commentInput} name="comment" type="text" placeholder="aaaaa" 
                        value={comment} onChange={handleChange}/>
                        <button className={styles.commentSubmit}>댓글쓰기</button>
                    </form>

                    <div className={styles.comment}>
                        sadasd
                    </div>
                    
                    <div className={styles.comment}>
                        sadasd
                    </div>
                    
                    <div className={styles.comment}>
                        sadasd
                    </div>
                    
                    <div className={styles.comment}>
                        sadasd
                    </div>
                    
                    <div className={styles.comment}>
                        sadasd
                    </div>
                    
                    <div className={styles.comment}>
                        sadasd
                    </div>
                    

                </div>

                </div>
        </div>

    );


};

export default ProductDetail;