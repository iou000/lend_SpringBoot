import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './header_main.module.css';
import HeaderPopUp from '../header_popup/header_popup';

const HeaderMain = ({logined}) => {
    
    const history = useHistory();
    const goToSearch = () => {
        history.push({
            pathname: "/search"
        })
    }

    // 토글메뉴 
    const[isSideMenuOpen,setSideMenuOpen] = useState({menuOpen:false});

    // 좌측 사이드 메뉴 토글
    const toggleSideMenu = () => {
        setSideMenuOpen({menuOpen:!isSideMenuOpen.menuOpen});
    }



    return (
        <header className={styles.header}>
            {isSideMenuOpen.menuOpen && <HeaderPopUp toggleMenu={toggleSideMenu} logined={logined}/>}
            
            <div className={styles.header_left}>
                <button className={`${styles.btn} ${styles.barBtn}`} onClick={toggleSideMenu}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <div className={styles.title}>
                <h1 className={styles.title_h1}>Lend</h1>
            </div>
            <div className={styles.header_right}>
                <button onClick={goToSearch} className={`${styles.btn} ${styles.searchBtn}`}><i className="fas fa-search"></i></button>
                <button className={`${styles.btn} ${styles.filterBtn}`}><i className="fas fa-filter"></i></button>
            </div>
        </header>
    );


};

export default HeaderMain;