import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './product_item.module.css';

const Product = ({product}) => {
        
    const history = useHistory();

    const click = () => {
        history.push({
            pathname: `product/${product.id}`,
            props: product.id
        
        })
    }



    return (
        <div className={styles.product_item}>
            <div className={styles.container} onClick={click}>
                <div className={styles.imagesec}>
                    <img className={styles.bycle_img} src={product.imgURL} alt="" />
                </div>
                <div className={styles.descsec}>
                    <div className={styles.product_title}>
                        <span>{product.title}</span>
                    </div>
                    <div className={styles.product_desc}>
                        <span>{product.detail}</span>
                    </div>
                    <div className={styles.product_price}>
                        <span className={styles.product_seller}>지역 : {product.location} </span>
                        <span>가격: {product.price_hour}일 / </span>
                        <span>{product.price_day}원</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Product;