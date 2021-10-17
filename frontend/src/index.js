import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import KakaoAuthService from './service/kakaoAuth_service';

const kakaoAuthService = new KakaoAuthService();

ReactDOM.render(
  <React.StrictMode>
    <App kakaoAuthService={kakaoAuthService}/>
  </React.StrictMode>,
  document.getElementById('root')
);