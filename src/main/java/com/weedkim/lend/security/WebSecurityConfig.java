package com.weedkim.lend.security;

import com.weedkim.lend.security.jwt.JwtAccessDeniedHandler;
import com.weedkim.lend.security.jwt.JwtAuthenticationEntryPoint;
import com.weedkim.lend.security.jwt.JwtSecurityConfig;
import com.weedkim.lend.security.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// 처음 스프링이 기동될 때 WebSecurityConfig 클래스를 바라보고 @Bean 함수들을 살펴보고 필요한 내용들을 Bean으로 담는다는 의미.
@Configuration
@EnableWebSecurity // 스프링 Security 지원을 가능하게 함.
@EnableGlobalMethodSecurity(prePostEnabled = true) //@PreAuthorize 검증 어노테이션을 메소드 단위로 사용하기 위해 추가.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    //TokenProvider, JwtAuthenticationEntryPoint, JwtAccessDeniedHandler 주입.
    public WebSecurityConfig(
            TokenProvider tokenProvider,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAccessDeniedHandler jwtAccessDeniedHandler
    ) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;

    }

    @Bean
    public BCryptPasswordEncoder encodePassword() {
        //BCryptPasswordEncoder 객체를 만들어서 IoC컨테이너에 넣어줌.
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .csrf().disable() //토큰 방식을 사용하기 때문에 csrf설정 disable.
                //예외처리를 할 때 jwtAuthenticationEntryPoint와 jwtAccessDeniedHandler로 추가.
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler);

        http.headers().frameOptions().disable();

        //세션을 사용하지 않기 때문에 STATELESS로 지정.
       http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests() //HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정.
                .antMatchers("/static/**","/favicon.ico").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/").permitAll()

                //아래 API는 Token이 없어도 호출할 수 있도록 허용.
                .antMatchers("/api/products").permitAll() //이거는 없애줘야함************* 무조건
                .antMatchers("/user/signup").permitAll()
                .antMatchers("/api/authenticate").permitAll()
                //그 외 모든 요청은 인증과정 필요.
                //어떤 요청이 오든 로그인 과정이 없으면 로그인을 하도록 해줌.
                .anyRequest().authenticated()

                .and()
                //JwtFilter를 addFilterBefore 메소드로 등록했던 JwtSecurityConfig 클래스를 적용 해줌.
                .apply(new JwtSecurityConfig(tokenProvider));
    }
}
