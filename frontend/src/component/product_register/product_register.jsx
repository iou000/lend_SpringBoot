import KakaoAPI from './kakaoAPI';
import styles from './product_register.module.css';
import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../spinner/spinner';

function ProductRegister({imageUploader}) {
    // 라우터
    const history = useHistory();
    
    const goBack = () => {
        history.goBack();
    }

    //비동기 통신중 로딩상태
    const [loading, setLoading] = useState(false);

    // 주소 받아오기
    const [textValue, setTextValue] = useState();

    const getTextValue = (text) => {
        setTextValue(text);
        setProductData({
            ...productData,
            ["location"]: text,
        })
    }
    // 상품
    const[productData, setProductData] = useState({
        "imgURL": '',
        "title": '',
        "type": '',
        "price_hour": '',
        "price_day": '',
        "detail": '',
        "location": '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();


        axios({
            method: 'post',
            url: 'api/createProducts',
            data: {
                "imgURL": productData.imgURL,
	            "title": productData.title,
	            "type": productData.type,
	            "price_hour": productData.price_hour,
	            "price_day": productData.price_day,
	            "detail":productData.detail,
	            "location": productData.location
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
        .then(res => {
            alert(`${res.data.detail} 제목으로 상품 등록 완료!!`);
            goBack();
        })
        .catch(error => {
            alert(`상품 등록 실패`);
        })
    }

    //상품정보 input에 변화가 생길시
    const handleProductChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        })
    }

    // 이미지 인풋과 사진 추가 버튼 연결
    const ImgRef = useRef();
    const imgBtnChange = (e) => {
        e.preventDefault();
        ImgRef.current.click(); //사진추가 버튼 클릭 == fileInput 클릭
    }

    //파일 선택시
    const handleFileChange = async (e) => {
        setLoading(true);
        const uploaded = await imageUploader.upload(e.target.files[0]); //클라우디너리에 파일 업로드
        setLoading(false);
        setProductData({
            ...productData,
            imgURL: uploaded.url //클라우디너리에 업로드 된 파일 url
        })
    }



    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <button className={styles.goBack} onClick={goBack}><i className="fas fa-arrow-left"></i></button>
                </div>
                <div className={styles.title}>
                    <h1 className={styles.title_h1}>상품 등록</h1>
                </div>
            </div>
            {/* Content */}
            <form className={styles.content} onSubmit={handleSubmit}>
                <KakaoAPI getTextValue={getTextValue} name="location" value={productData.location || ""} />
                    {/* <span>당신의 주소는 { textValue }</span> */}
                {/* img */}
                {!loading &&
                        <div className={styles.product_img}>
                                <input ref={ImgRef}  style={{display: "none"}} onChange={handleFileChange}
                                type="file" className="imgInput" name="product_img" accept="image/*" multiple/>
                                { !productData.imgURL &&
                                    <button onClick={imgBtnChange} className={styles.img_inputBtn}>사진 추가</button>
                                }
                        </div>
                }
                {loading &&
                    <div className={styles.product_img}>
                        <Spinner />
                    </div>
                }

                {productData.imgURL !== '' && 
                            <img
                            className="imgBox"
                            key=""
                            src={productData.imgURL}
                            alt="First slide" 
                            style={{width:"50%", height:"350px", display:"flex",  flexDirection: "row"}}
                            />
                }
                {/* Product Input */}
                <div className={styles.inputContent}>
                    <input className={styles.productName} name="title" type="text" placeholder="상품 이름"
                    value={productData.title || ""} onChange={handleProductChange} />
                    <select name="type" className={styles.bikeStyle} value= {productData.type || ""} onChange={handleProductChange}>
                        <option>-- 자전거 종류 --</option>
                        <option>하이브리드</option>
                        <option>MTV</option>
                        <option>로드</option>
                    </select>
                    <div className={styles.priceDiv}>
                        <input className={styles.productHourPrice} type="text" name="price_hour" placeholder="상품 가격 (1시간 당)" 
                        value={productData.price_hour || ""} onChange={handleProductChange}/>
                        <input className={styles.productDayPrice} type="text" name="price_day" placeholder="상품 가격 (1일 당)" 
                        value={productData.price_day || ""} onChange={handleProductChange}/>
                    </div>
                    <textarea className={styles.productDesc} name="detail" type="text" placeholder="상품의 상세 설명을입력하세요" 
                    value={productData.detail || ""} onChange={handleProductChange}/>
                    
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

