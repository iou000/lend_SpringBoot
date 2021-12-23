import KakaoMap from '../../../service/kakaoMap/kakaoMap';
import styles from './product_register.module.css';
import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../../spinner/spinner';

function ProductRegister({imageUploader}) {
    // 라우터
    const history = useHistory();
    
    const goBack = () => {
        history.goBack();
    }

    //비동기 통신중 로딩상태
    const [loading, setLoading] = useState(false);

    //카카오맵 찍으면 찍힌 값을 가져옴
    const getTextValue = (text) => {
        setProductData({
            ...productData,
            "location": text,
        })
    }
    // 상품
    const[productData, setProductData] = useState({
        "location": '',
        "imgURL": '',
        "title": '',
        "type": '',
        "price_hour": '',
        "price_day": '',
        "detail": '',
    });

    //input ref 정의
    const titleInput = useRef();
    const typeInput = useRef();
    const ImgRef = useRef();
    const hpriceInput = useRef();
    const dpriceInput = useRef();
    const detailInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //입력값 검사
        if(!productData.location) {
            alert("주소를 입력해주세요");
            return ;
        }
        if(!productData.imgURL) {
            alert("상품 사진을 등록해주세요.");
            ImgRef.current.focus();
            return ;
        }
        if(!productData.title) {
            alert("상품 이름을 입력해주세요.");
            titleInput.current.focus();
            return ;
        }
        if(!productData.type && productData.type === '-- 자전거 종류 --') {
            alert("자전거 종류를 선택해주세요.");
            console.log(productData.type)
            typeInput.current.focus();
            return ;
        }
        if(!productData.price_hour) {
            alert("상품 가격(1시간)을 입력해주세요.");
            hpriceInput.current.focus();
            return ;
        }
        if(!productData.price_day) {
            alert("상품 가격(1일)을 입력해주세요.");
            dpriceInput.current.focus();
            return ;
        }
        if(!productData.detail) {
            alert("상품 상세 설명을 입력해주세요.");
            detailInput.current.focus();
            return ;
        }


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
            alert(`${res.data.title} 제목으로 상품 등록 완료!!`);
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
                    <h1>상품 등록</h1>
                </div>
            </div>
            {/* Content */}
            <form className={styles.content} onSubmit={handleSubmit}>
                <KakaoMap getTextValue={getTextValue}/>
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

                {productData.imgURL && 
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
                    <input className={styles.productName} name="title" type="text" ref={titleInput} placeholder="상품 이름"
                    value={productData.title} onChange={handleProductChange} />
                    <select name="type" className={styles.bikeStyle} value= {productData.type} ref={typeInput} onChange={handleProductChange}>
                        <option>-- 자전거 종류 --</option>
                        <option>하이브리드</option>
                        <option>MTB</option>
                        <option>로드</option>
                    </select>
                    <div className={styles.priceDiv}>
                        <input className={styles.productHourPrice} type="text" name="price_hour" ref={hpriceInput} placeholder="상품 가격(1시간)" 
                        value={productData.price_hour} onChange={handleProductChange}/>
                        <input className={styles.productDayPrice} type="text" name="price_day" ref={dpriceInput} placeholder="상품 가격(1일)" 
                        value={productData.price_day} onChange={handleProductChange}/>
                    </div>
                    <textarea className={styles.productDesc} name="detail" type="text" ref={detailInput} placeholder="상품의 상세 설명을입력하세요" 
                    value={productData.detail} onChange={handleProductChange}/>
                    
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

