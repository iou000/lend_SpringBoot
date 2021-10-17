import { useRef } from 'react';
import styles from './header_search.module.css';

const Header_search = ({toggleMenu}) => {

    //검색메뉴 토글
    const onMenutoggle = (e) => {
        if(e.target.className === styles.containerSearch) {
            toggleMenu();
        };
    }
    
    //검색어
    const inputRef = useRef();


    return (
        <div className={styles.containerSearch} onClick={onMenutoggle}>
            <div className={styles.searchBox}>
                <input 
                    ref={inputRef}
                    className={styles.search} 
                    type="search" 
                    placeholder="검색어를 입력하세요." />
            </div>
            <div className={styles.searchContent}>
                <h2>추천 검색어</h2>
                <span>로드 바이크</span>
                <span>MTV</span>
                <span>픽시 바이크</span>
                <span>전기 자전거</span>
                <span>외발 자전거</span>
            </div>
        </div>
    );
};

export default Header_search;