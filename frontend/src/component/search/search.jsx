import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import ProductList from '../product_list/product_list';
import styles from './search.module.css';


const Search = (props) => {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    // 검색어텍스트
    const[inputText,setInputText] = useState('');
    const[searchProducts, setSearchProducts] = useState([]);


    //검색어
    const inputRef = useRef();
    const messageRef = useRef();

    //검색어 텍스트가 변경될 때마다 실행.
    const onInputChange = () => {
        setInputText(`${inputRef.current.value}`);
    }


    //검색어 텍스트 삭제
    const onDeleteInput = () => {
        inputRef.current.value = "";
    }

    const SearchProduct = (query) => {
        axios({
            method: 'get',
            url: `/api/search/products?query=${query}`,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(prod => {
            console.log(prod.data)
            setSearchProducts(prod.data);
        })
        
    }

    const hideMessage = () => {
        messageRef.current.style="display:none;";
    }


    const onSearchEnter = (e) => {
        if(e.key ==='Enter') {
            inputText && SearchProduct(inputText);
            searchProducts && hideMessage();
        }

    }

    return (
        <div className={styles.search}>
            <div className={styles.search_header}>
                <button className={styles.back} onClick={goBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className={styles.inputBox}>
                <input
                    ref={inputRef}
                    className={styles.search_input}
                    type="search"
                    placeholder="원하는 자전거를 검색해주세요." 
                    onChange={onInputChange}
                    onKeyPress={onSearchEnter}/>

                {(inputText) && 
                    <button className={styles.cancel} onClick={onDeleteInput}>
                        <i className="fas fa-times-circle"></i>
                    </button>
                }
                </div>
            </div>
            <div className={styles.message} ref={messageRef}>
                <h2>검색어를 입력해주세용.</h2>
            </div>
            {searchProducts &&<ProductList products={searchProducts} />}
        </div>
    )


};

export default Search;