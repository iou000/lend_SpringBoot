import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import KakaoAuthService from './service/oAuth/kakaoAuth_service';
import ImageUploader from './service/image_uploader';

const kakaoAuthService = new KakaoAuthService();
const imageUploader = new ImageUploader([]);

ReactDOM.render(
  <React.StrictMode>
    <App kakaoAuthService={kakaoAuthService} imageUploader={imageUploader}/>
  </React.StrictMode>,
  document.getElementById('root')
);