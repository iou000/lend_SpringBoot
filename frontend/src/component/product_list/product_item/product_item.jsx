import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { timeBefore } from '../../../service/timeBefore';
import styles from './product_item.module.css';

const Product = ({product}) => {
        
    const history = useHistory();

    const onProductClick = () => {
        history.push({
            pathname: `product/${product.id}`,
            props: product.id
        
        })
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div className={styles.product_item}>
            <div className={styles.container} onClick={onProductClick}>
                {/* 이미지 영역 */}
                <div className={styles.imagesec}>
                    <img className={styles.product_img} src={product.imgURL} alt="" />
                </div>
                <div className={styles.product_detail}>
                    {/* 상품 설명 */}
                    <div className={styles.descsec}>
                        <div className={styles.product_title}>
                            <span>{product.title}</span>
                        </div>
                        <div className={styles.product_location}>
                            <span>{product.location} &#183; {timeBefore(product.createdAt)}</span>
                        </div>
                    </div>
                    {/* 가격 */}
                        <div className={styles.priceBox}>
                        <span id={styles.type}>{product.type}</span>
                            {numberWithCommas(product.price_hour)}원<span className={styles.price}>(시간) </span>
                            {numberWithCommas(product.price_day)}원<span className={styles.price}>(일)</span>
                        </div>
                </div>
            </div>
        </div>
    )
};

export default Product;