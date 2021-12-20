class KakaoAuthService {

    login(code) {
        
        const data = {
            'grant_type': 'authorization_code',
            'client_id': '52b4dc20f1afb496f72ad8d062fdbd7c',
            'redirect_uri': 'http://localhost:3000/oauth/kakao',
            'code': `${code}`
        }
        const queryString = Object.keys(data)
            .map(d => encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
            .join('&');
        
        return fetch(`https://kauth.kakao.com/oauth/token?${queryString}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },

        })

        
    }
}

export default KakaoAuthService;