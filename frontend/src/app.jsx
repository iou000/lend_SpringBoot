import styles from './app.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import ProductRegister from './components/product/product_register/product_register';
import KakaoAuthRedirect from './components/kakaoAuthRedirect/kakaoAuthRedirect';
import SignUp from './components/sign_up/signUp';
import Main from './components/main/main';
import Search from './components/search/search';
import ProductDetail from './components/product/Product_detail/product_detail';

function App({kakaoAuthService, imageUploader}) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>

          {/* 메인 페이지 */}
          <Route exact path="/">
            <Main />
          </Route>

          {/* 로그인 페이지 */}
          <Route exact path="/login">
            <Login />
          </Route>

          {/* 상품 등록 페이지 */}
          <Route exact path="/product_register">
            <ProductRegister imageUploader={imageUploader}/>
          </Route>

          {/* 카카오 로그인 페이지 */}
          <Route exact path="/oauth/kakao">
            <KakaoAuthRedirect kakaoAuthService={kakaoAuthService}/>
          </Route>

          {/* 회원가입 페이지 */}
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          
          {/* 상품 상세 페이지 */}
          <Route path="/product/:id">
            <ProductDetail />
          </Route>

          {/* 검색 페이지 */}
          <Route exact path="/search">
            <Search />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
