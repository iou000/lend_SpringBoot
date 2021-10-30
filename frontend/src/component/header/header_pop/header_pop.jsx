import React from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from '../user_info/user_info';
import styles from './header_pop.module.css';

const HeaderPop = ({toggleMenu, logined}) => {

    const history = useHistory();
    //로그인 화면으로 이동
    const goToLogin = () => {
        history.push({
            pathname: "/login"
        })
    }

    
    //좌측 사이드 메뉴 토글
    const onMenutoggle=(e) => {
        if(e.target.className === styles.left_pop) {
            toggleMenu();
        };
    }


    return (
        <div className={styles.left_pop} onClick={onMenutoggle}>
            <div className={styles.pop_menu}>
                    {
                    !logined && (
                    <div className={styles.beforeLogin}>
                        <span className={styles.message}>서비스를 이용하시려면 로그인 해주세요.</span>
                        <span className={styles.move_login_page} onClick={goToLogin}>로그인 또는 회원가입 〉</span>
                    </div>
                    )
                    }
                    {logined &&
                        <UserInfo/>
                    }
            </div>  
        </div>
    )
};

export default HeaderPop;

// className={styles.}