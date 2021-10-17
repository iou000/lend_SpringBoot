import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './signUp.module.css';
import axios from 'axios';
import CSRFToken from './csrftoken';

const SignUp = (props) => {
    
    
    const history = useHistory();
    const[signUpdata, setSignUpData] = useState({
        "username": '',
        "password": '',
        "nickname": '',
        "phone": '',
    });

    const goToLogin = () => {
        history.push({
            pathname: "/login"
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const arr = Object.entries(signUpdata);

        if(signUpdata) {
            for(let i = 0; i< arr.length; i++) {
                if(arr[i][1] === "") {
                    return alert(`${arr[i][0]} 을(를) 입력해주세요.`);
                }
            }

            for(let i=0; i<signUpdata.phone.length; i++){
                if(signUpdata.phone.length !== 11 || Number.isInteger(parseInt(signUpdata.phone[i])) === false) {
                    setSignUpData({...signUpdata, "phone":''});
                    return alert('전화번호 형식이 올바르지 않습니다. ex)01012345678');
                }
            }
            axios({
                method: 'post',
                url: '/user/',
                data: JSON.stringify({
                    username: signUpdata.username,
                    password: signUpdata.password,
                    nickname: signUpdata.nickname,
                    phone: signUpdata.phone,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })


            alert(`id: ${signUpdata.username}으로 회원가입 되었습니다.`)
            goToLogin();
        }
    }


    const handleChange = (e) => { //요소에 변화가 생기면 실행
        setSignUpData({
            ...signUpdata,
            [e.target.name]: e.target.value,
        })
    }



    return (
        <div className={styles.signUp}>
            <button className={styles.back} onClick={goToLogin}><i className="fas fa-arrow-left"></i></button>
            <h1 className={styles.title}>Lend</h1>
            {/* 회원가입 폼 */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <CSRFToken />
                <label className={styles.label}>아이디
                    <input className={styles.input} type="text" name="username" placeholder='아이디' value={signUpdata.username || ""} onChange={handleChange}></input>
                </label>


                <label className={styles.label}>비밀번호
                    <input className={styles.input} type="password" name="password" placeholder='비밀번호' value={signUpdata.password || ""} onChange={handleChange}></input>
                </label>

                <label className={styles.label}>닉네임
                    <input className={styles.input} type="text" name="nickname" placeholder='닉네임' value={signUpdata.nickname || ""} onChange={handleChange}></input>
                </label>

                <label className={styles.label}>전화번호
                    <input className={styles.input} type="text" name="phone" placeholder='(-)제외  ex)01012345678' value={signUpdata.phone || ""} onChange={handleChange}></input>
                </label>

                <input className={styles.submit} type="submit" value="가입하기"></input>
            </form>
        </div>
    )
};

export default SignUp;