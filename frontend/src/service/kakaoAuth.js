const kakao_client_id = "52b4dc20f1afb496f72ad8d062fdbd7c";
const kakao_redirect_uri = "http://localhost:3000/oauth/kakao";

export const KakaoAuth = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakao_client_id}&redirect_uri=${kakao_redirect_uri}`;