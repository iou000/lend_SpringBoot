package com.weedkim.lend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// 처음 스프링이 기동될 때 WebSecurityConfig 클래스를 바라보고 @Bean 함수들을 살펴보고 필요한 내용들을
// Bean으로 담는다는 의미
@Configuration
@EnableWebSecurity // 스프링 Security 지원을 가능하게 함
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public BCryptPasswordEncoder encodePassword() {
        //BCryptPasswordEncoder 객체를 만들어서 IoC컨테이너에 넣어줌.
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.authorizeRequests() //HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정
                .antMatchers("/static/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/").permitAll()
                .antMatchers("/api/products").permitAll()
                .antMatchers("/login").permitAll()

                //그 외 모든 요청은 인증과정 필요
                .anyRequest().authenticated() //어떤 요청이 오든 로그인 과정이 없으면 로그인을 하도록 해줌.
                .and()
                .logout() //로그아웃 기능도 허용해줌.
                .logoutUrl("/user/logout")
                .permitAll();
    }
}
