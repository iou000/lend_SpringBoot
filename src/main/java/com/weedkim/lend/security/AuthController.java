package com.weedkim.lend.security;

import com.weedkim.lend.security.dto.TokenDto;
import com.weedkim.lend.security.jwt.JwtFilter;
import com.weedkim.lend.security.jwt.TokenProvider;
import com.weedkim.lend.user.dto.LoginDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("api/authenticate")
    public ResponseEntity<TokenDto> authorize(@RequestBody LoginDto loginDto) {
        //Username과 Password를 통해 authenticationToken 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        //authenticationToken을 이용해서 authenticate메소드가 실행될 때 CustomUserDetailsService에서만든 loadUserByUsername()메소드 실행
        //실행된 결과값으로 authentication객체 생성
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        //authentication객체를 SecurityContext에 저장 (JwtFilter 클래스의 doFilter() 메소드와 유사하게 )
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //authentication객체에 인증정보를 기준으로 tokenProvider에서 만든 createToken()메소드를 통해 jwt토큰 생성
        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        //jwt토큰을 Response Header에도 넣어주고 ,
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        // TokenDto 객체를 이용해 Reponse Body에도 넣어서 리턴
        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }
}
