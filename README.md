# lend_SpringBoot
한이음 프로젝트 ‘빌려드림’을 Spring boot 서버로 재구성한 프로젝트 입니다.

한이음 프로젝트 ‘빌려드림’ 깃허브 주소 : [https://github.com/Final-Bil/2021Hanium](https://github.com/Final-Bil/2021Hanium)

## 구현 화면
![메인화면](https://user-images.githubusercontent.com/68727627/147413945-7c8490f8-81db-4eaa-bedf-6a7875e23830.JPG)
![팝업메뉴(로그인전)](https://user-images.githubusercontent.com/68727627/147413950-194ae31d-96d8-4119-98bb-343ae028a15c.JPG)
![팝업메뉴(로그인 후)](https://user-images.githubusercontent.com/68727627/147413976-1855f4bf-ed11-4629-9524-36287c21386a.JPG)
![로그인 화면](https://user-images.githubusercontent.com/68727627/147413944-032c3638-2157-46fe-bc96-6ec55132853e.JPG)
![회원가입 화면](https://user-images.githubusercontent.com/68727627/147413952-19d67788-58e5-4872-a5ba-48da7570ffac.JPG)
![상품 등록 화면](https://user-images.githubusercontent.com/68727627/147413947-6eb80683-37e7-4bd1-bf88-f7d081ed53c9.JPG)
![검색화면(1)](https://user-images.githubusercontent.com/68727627/147413942-7ac74bb5-66ff-4072-8fb0-e31c62c63fb2.JPG)
![상품 검색](https://user-images.githubusercontent.com/68727627/147413946-e73f9734-705f-4edf-9e35-ed51c28e033e.JPG)
![상품 상세](https://user-images.githubusercontent.com/68727627/147413948-0548e612-6f3e-4ebb-80c7-d5db37fef0b6.JPG)
![댓글기능](https://user-images.githubusercontent.com/68727627/147413943-a0172bdd-d020-4e3b-a5f7-aea37ef0b8d5.JPG)

메인화면 > 팝업메뉴(로그인전) > 팝업메뉴(로그인후) > 로그인 > 회원가입 > 상품 등록 > 검색 화면 > 상품 검색 > 상품 상세 > 댓글기능

## 프론트엔드

- **프론트엔드 사용 기술, 라이브러리**
    
    html, css, js, react, react-router-dom, postcss(모듈화), cloudinary CDN(이미지 서버)
    
    axios, 카카오맵 api, 카카오로그인 api, fontawesome
    
- 개발툴 : vscode
- **프론트엔드 디렉토리 구조**

```bash
├─common
├─components                 // 컴포넌트
│  ├─comment
│  │  ├─comment_item
│  │  └─comment_list
│  ├─footer
│  ├─header
│  │  ├─header_main
│  │  ├─header_popup
│  │  └─header_pouup_logined
│  ├─kakaoAuthRedirect
│  ├─kakaoMap
│  ├─login
│  ├─main
│  ├─product
│  │  ├─Product_detail
│  │  ├─product_item
│  │  ├─product_list
│  │  └─product_register
│  ├─search
│  ├─sign_up
│  └─spinner                 //로딩 스피너
└─service
    ├─oAuth
    └─stringConversion       //문자열 변경 관련 함수
```

- **컴포넌트 구조**
- App
    - Main  [메인 페이지]
        - Header
            - HeaderPopUp
            - HeaderPopUpLogined
        - ProductList
            - ProductItem
        - Footer
    - Login  [로그인 페이지]
    - SignUp  [회원가입 페이지]
    - ProductRegister  [상품 등록 페이지]
        - KakaoMap
        - Spinner
    - ProductDetail  [상품 상세 페이지]
        - CommentList
            - CommentItem
    - Search  [상품 검색 페이지]
        - ProductList
            - ProductItem

## 백엔드

- **백엔드 개발환경, 사용 라이브러리**
    
    spring-boot 2.4.1, lombok, springweb, spring data jpa, spring security, jjwt-api 0.11.2, H2 Database
    
- 개발툴 : IntelliJ
- **백엔드 main 디렉토리 구조**

```bash
├─comment         // 댓글 관련 API
│  ├─controller
│  ├─dto
│  ├─models
│  └─serivce
├─product         // 상품 관련 API
│  ├─controller
│  ├─dto
│  ├─models
│  └─service
├─react404        // 새로고침, 뒤로가기 에러처리
├─security        // 인증 관련 API (스프링 시큐리티)
│  ├─dto
│  └─jwt
└─user            // 유저 관련 API
    ├─controller
    ├─dto
    ├─models
    └─service
```

- DB

![db](https://user-images.githubusercontent.com/68727627/147414113-293fd6d1-b6bf-476a-bd73-cd78b8589347.JPG)

- **프로젝트 기능**
    1. 상품 관련 기능
    2. 댓글 관련 기능
    3. 인증 관련 기능
    4. 유저 관련 기능

- **배포**
    
    AWS EC2 + RDS
    
    웹앱 버전: React Native (webview)
