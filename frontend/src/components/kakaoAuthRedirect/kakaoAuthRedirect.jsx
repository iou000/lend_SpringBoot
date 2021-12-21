import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './kakaoAuthRedirect.module.css';

const KakaoAuthRedirect = ({kakaoAuthService}) => {
    
    let code = new URL(window.location.href).searchParams.get('code');
    const history = useHistory();
    const goToHome = (token) => {
        history.push({
            pathname: "/",
            state: {
                kakao_access_token : token.access_token,
                kakao_refresh_token : token.refresh_token,
            }
        })
        alert("로그인 되었습니다.");
    }


    useEffect(() => {
        kakaoAuthService.login(code)
        .then(res => res.json())
        .then(token => goToHome(token))
    })


    return (
        <div className={styles.kakaoAuthRedirect}>
            <span className={styles.message}>카카오로 로그인중..</span>
            <div className={styles.loading}></div>
        </div>

    )
    
};

export default KakaoAuthRedirect;