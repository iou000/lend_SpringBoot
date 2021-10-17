import KakaoAPI from './kakaoAPI';
import styles from './product_register.module.css';
import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';

function ProductRegister() {
    // 라우터
    const history = useHistory();
    
    const goToHome = () => {
        history.push({
            pathname: "/"
        })
    }
    // 이미지
    const [imgBase64, setImgBase64] = useState([]); // 미리보기
    const [imgFile, setImgFile] = useState(null); // 사진 파일
    
    const handleChangeFile = (e) => {
        // console.log(e.target.files);
        setImgFile(e.target.files);
        setImgBase64([]);
        for(var i = 0; i < e.target.files.length; i++) {
            if (e.target.files[i]) {
                let reader = new FileReader();
                // 1. 파일을 읽어 버퍼에 저장
                reader.readAsDataURL(e.target.files[i]);

                //파일 상태 업데이트
                reader.onloadend = () => {
                    // 2. 읽기가 완료되면 아래 코드 실행
                    const base64 = reader.result;
                    // console.log(base64);
                    // imgFile.push(base64);
                    if (base64) {
                        var base64Sub = base64.toString();
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        console.log(imgBase64);
                    }
                }
            }
        }
        setProductData({
            ...productData,
            [e.target.name]: e.target.files[0],
        })
    }


    

    // 이미지 인풋과 사진 추가 버튼 연결
    const inputImgRef = useRef();

    const btnChange = (e) => {
        e.preventDefault();
        inputImgRef.current.click();
    }
    // 주소 받아오기
    const [textValue, setTextValue] = useState();

    const getTextValue = (text) => {
        setTextValue(text);
        setProductData({
            ...productData,
            ["product_location"]: text,
        })
    }
    // 상품
    const[productData, setProductData] = useState({
        "product_img": '',
        "product_name": '',
        "product_type": '',
        "product_lend_h": '',
        "product_lend_d": '',
        "product_detail": '',
        "product_location": '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        
        const fd = new FormData();
        fd.append("product_img", productData.product_img);
        fd.append("product_name", productData.product_name);
        fd.append("product_type", productData.product_type);
        fd.append("product_lend_h", productData.product_lend_h);
        fd.append("product_lend_d", productData.product_lend_d);
        fd.append("product_detail", productData.product_detail);
        fd.append("product_location", productData.product_detail);
        console.log(productData);

        axios({
            method: 'post',
            url: '/product/',
            data: fd,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        if(imgFile == null){
            alert("이미지를 등록 해주세요");
            return false;
        } else {
            alert(`'${productData.product_name}'제목으로 상품등록 완료!`);
            goToHome();
        }
    }

    const handleChange = (e) => { //요소에 변화가 생기면 실행
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        })
    }



    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <button className={styles.gotoHome} onClick={goToHome}><i className="fas fa-arrow-left"></i></button>
                </div>
                <div className={styles.title}>
                    <h1 className={styles.title_h1}>상품 등록</h1>
                </div>
            </div>
            {/* Content */}
            <form className={styles.content} onSubmit={handleSubmit}>
                <KakaoAPI getTextValue={getTextValue} name="product_location" value={productData.product_location || ""} />
                    {/* <span>당신의 주소는 { textValue }</span> */}
                {/* Photo */}
                <div className={styles.product_photo}>
                    <input ref={inputImgRef}  style={{display: "none"}} onChange={handleChangeFile}
                    type="file" className="imgInput" name="product_img" accept="image/*" multiple="multiple"/>
                    <button onClick={btnChange} className={styles.photo_inputBtn}>사진 추가</button>
                </div>
                {imgBase64.map((item) => {
                        return(
                            <img
                            className="imgBox"
                            key=""
                            src={item}
                            alt="First slide" 
                            style={{width:"50%", height:"350px", display:"flex",  flexDirection: "row"}}
                            />
                        )
                })}
                
                {/* Product Input */}
                <div className={styles.inputContent}>
                    <input className={styles.productName} name="product_name" type="text" placeholder="상품 이름"
                    value={productData.product_name || ""} onChange={handleChange} />
                    <select name="product_type" className={styles.bikeStyle} value= {productData.product_type || ""} onChange={handleChange}>
                        <option>-- 자전거 종류 --</option>
                        <option>하이브리드</option>
                        <option>MTV</option>
                        <option>로드</option>
                    </select>
                    <div className={styles.priceDiv}>
                        <input className={styles.productHourPrice} type="text" name="product_lend_h" placeholder="상품 가격 (1시간 당)" 
                        value={productData.product_lend_h || ""} onChange={handleChange}/>
                        <input className={styles.productDayPrice} type="text" name="product_lend_d" placeholder="상품 가격 (1일 당)" 
                        value={productData.product_lend_d || ""} onChange={handleChange}/>
                    </div>
                    <textarea className={styles.productDesc} name="product_detail" type="text" placeholder="상품의 상세 설명을입력하세요" 
                    value={productData.product_detail || ""} onChange={handleChange}/>
                    
                </div>
                {/* Submit */}
                <div className={styles.product_submit}>
                    <button type="submit" className={styles.submitBtn}>상품등록하기</button>
                </div>
            </form>
        </div>
        
        
    );
}
export default ProductRegister;

