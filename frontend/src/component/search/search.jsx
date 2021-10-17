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

    const onSearch = (inputText) => {
        //console.log(inputText);
        fetch(process.env.PUBLIC_URL + "/static/data_sample.json") // /api/search?query=검색어 로 get요청 해줘야함.
        .then(res => res.json())
        .then(data => data.products)
        //data.products에 검색결과가 없다고 담겨오면
        //messageRef.current에 검색결과가 없다고 해줘야햠.
        .then(searchProd => {
            // if(searchProd === "결과없음") {
            //   messageRef.current에 검색결과가 없다고 dom을 만들어줘야함. 다시 검색했을 때도 없다는 dom이 나오면 안되니까 없애는거 먼저 써줘야함.
            // }
            searchProd = searchProd.filter(prod => {
                if(prod.product_name.includes(inputText) || 
                    prod.product_description.includes(inputText) ||
                    prod.gu.includes(inputText)
                    ) {
                    return prod;
                }
            })

            return setSearchProducts(searchProd);
        })
        .catch(error => console.error(error))
    }

    const hideMessage = () => {
        messageRef.current.style="display:none;";
    }


    const onSearchEnter = (e) => {
        if(e.key ==='Enter') {
            inputText && onSearch(inputText);
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
                    placeholder="지역이나 자전거를 검색해주세요." 
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