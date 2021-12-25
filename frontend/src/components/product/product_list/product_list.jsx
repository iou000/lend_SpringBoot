import React from 'react';
import styles from './product_list.module.css';
import ProductItem from '../product_item/product_item';


const ProductList = ({products}) => {
    
    return (
        <section className={styles.product_list}>
            {/* <button className={styles.btn_regiprod}>버튼</button> */}
            {
                products.map(product => 
                    <ProductItem 
                        key={product.id}
                        product={product}
                    />
                )
            }
        </section>
    )


};

export default ProductList;