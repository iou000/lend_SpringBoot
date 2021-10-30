import React from 'react';
import { useHistory } from 'react-router';
import styles from './user_info.module.css';

const UserInfo = (props) => {

    const history = useHistory();
    
    const goToMyProduct = () => {
        history.push({
            pathname: "/myproduct"
        })
    }

    
    const logout = () => {

        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('lend_user_nickname');
        window.location.replace("/");
    }

    return (
        <>
            <div className={styles.pop_profile}>
                <div className={styles.profile_left}>
                    <button className={styles.profileImg}><i className="fas fa-user-circle"></i></button>
                </div>
                <div className={styles.profile_middle}>
                    <span className={styles.nickName}>{localStorage.getItem('lend_user_nickname')}</span>
                    <button className={styles.move_profile_page}><span>내 프로필 수정 </span></button>
                </div>
                <div className={styles.profile_right}>
                    <button className={styles.logoutBtn} onClick={logout}><i class="fas fa-sign-out-alt"></i></button>
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
        </>
    )
};

export default UserInfo;