import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getCurrentUser } from '../../service/getCurrentUser';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductList from '../product_list/product_list';
import styles from './main.module.css';

const Main = (props) => {
    
    // 유저정보 (로그인 기능 구현 시 작성)
    // const[userInfo, setUserInfo] = useState(historyState && historyState.userInfo);

    //상품 리스트 객체 배열
    const[products, setProducts] = useState([]);

    const history = useHistory();
    const goToProductRegister = () => {
        history.push({
            pathname: "/product_register"
        })
    }

    const[logined, setLogined] = useState(false);





    //전체 상품 리스트 가져오기
    const loadProducts = async () => {
        const res = await fetch('/api/products');
        return await res.json();
    }

    //main컴포넌트가 마운트되면  userInfo에 해당하는(지역 등) products를 받아옴
    useEffect(() => {
        // if(!userInfo) { (로그인 기능 구현 시 작성. 의존성배열userInfo 추가해야함.
        //     return;
        // }
        loadProducts()
        .then(prod => setProducts(prod))

    },[]);

    //로그인 상태 
    useEffect(() => {
        getCurrentUser()
        .then(res => {
            setLogined(true)
            localStorage.setItem('lend_user_nickname',res.data.nickname)
        })
        .catch(error => setLogined(false))
    },[])


    
    
    return (
        <div className={styles.main}>
            <Header logined={logined}/>
            <ProductList products={products}/>
            <Footer />

            {/* 상품등록페이지로 이동 버튼 */}
            <button onClick={goToProductRegister} className={styles.float}>
                <i className="fas fa-plus"></i>
            </button>
        </div>
    );

};

export default Main;