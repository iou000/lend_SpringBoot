import styles from './app.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './component/login_register/login';
import ProductRegister from './component/product_register/product_register';
import KakaoAuthRedirect from './component/kakaoAuthRedirect/kakaoAuthRedirect';
import SignUp from './component/login_register/signUp';
import MyProduct from './component/header/myproduct/myproduct';
import Main from './component/main/main';
import Search from './component/search/search';
import ProductDetail from './component/product_list/product_detail';

function App({kakaoAuthService}) {
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

          <Route exact path="/myproduct">
            <MyProduct />
          </Route>

          {/* 상품 등록 페이지 */}
          <Route exact path="/product_register">
            <ProductRegister />
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
