import React from 'react';
import styles from './product_item.module.css';

const Product = ({product}) => {
        



    return (
        <div className={styles.product_item}>
            <div className={styles.imagesec}>
                <img className={styles.bycle_img} src={product.img_url} alt="" />
            </div>
            <div className={styles.descsec}>
                <div className={styles.product_title}>
                    <span>{product.product_name}</span>
                </div>
                <div className={styles.product_desc}>
                    <span>{product.product_description}</span>
                </div>
                <div className={styles.product_price}>
                    <span className={styles.product_seller}>판매자 : {product.member} </span>
                    <span>가격: {product.rent_day}일 / </span>
                    <span>{product.price_rent_day}원</span>
                </div>
            </div>
        </div>
    )
};

export default Product;