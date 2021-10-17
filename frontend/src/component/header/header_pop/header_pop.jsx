import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './header_pop.module.css';

const HeaderPop = ({toggleMenu}) => {

    const history = useHistory();
    //로그인 화면으로 이동
    const goToLogin = () => {
        history.push({
            pathname: "/login"
        })
    }

    const goToMyProduct = () => {
        history.push({
            pathname: "/myproduct"
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
                    {/* 로그인 되었을 시 안나옴 */}
                    <div className={styles.beforeLogin}>
                        <span className={styles.message}>서비스를 이용하시려면 로그인 해주세요.</span>
                        <span className={styles.move_login_page} onClick={goToLogin}>로그인 또는 회원가입 〉</span>
                    </div>

                    {/* 로그인 되었을 시 나옴 */}
                    <div className={styles.pop_profile}>
                        <div className={styles.profile_left}>
                            <button className={styles.profileImg}><i className="fas fa-user-circle"></i></button>
                        </div>
                        <div className={styles.profile_right}>
                            <span className={styles.nickName}>닉네임</span>
                            <button className={styles.move_profile_page}><span>내 프로필 수정 </span></button>
                        </div>
                    </div>
                    <div onClick={goToMyProduct} className={styles.pop_profilemenu}>
                        <div className={styles.profilemenu_left}>
                            <button className={styles.profilemenuImg}><i className="fas fa-archive"></i></button>
                        </div>
                        <div className={styles.profilemenu_right}>
                            <span className={styles.myProduct}>내 등록 상품</span>                        
                        </div>
                    </div>
                    <div className={styles.pop_profilemenu}>
                        <div className={styles.profilemenu_left}>
                            <button className={styles.profilemenuImg}><i className="fas fa-comments"></i></button>
                        </div>
                        <div className={styles.profilemenu_right}>
                            <span className={styles.myProduct}>채팅</span>                        
                        </div>
                    </div>
            </div>  
        </div>
    )
};

export default HeaderPop;

// className={styles.}