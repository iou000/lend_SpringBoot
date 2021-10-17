import React, { useEffect, useState } from 'react';

const ProductDetail = (props) => {

    const[product,setProduct] = useState({});

    const productId = parseInt(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1));
    useEffect(() => {

        fetch(process.env.PUBLIC_URL + "/static/data_sample.json") // /api/search?query=검색어 로 get요청 해줘야함.
        .then(res => res.json())
        .then(data => data.products)
        .then(products => {
            console.log(products);
            const product = products.filter(item => {
                if(item.id === productId){
                    return item;
                }
            })
            setProduct(product[0])
        })
        
    },[])

    return (
        <>
        <div>{product.id}</div>
        </>

    );


};

export default ProductDetail;