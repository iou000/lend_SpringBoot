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
        </div>
    )
};

export default Product;