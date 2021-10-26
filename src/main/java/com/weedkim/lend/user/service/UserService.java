package com.weedkim.lend.user.service;

import com.weedkim.lend.security.SecurityUtil;
import com.weedkim.lend.user.dto.SignupRequestDto;
import com.weedkim.lend.user.models.Authority;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.user.models.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public User registerUser(SignupRequestDto requestDto) {
        // 회원 ID 중복 확인
        Optional<User> found = userRepository.findByUsername(requestDto.getUsername());
        if (found.isPresent()) {
            throw new IllegalArgumentException("중복된 사용자 ID 가 존재합니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .username(requestDto.getUsername())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .nickname(requestDto.getNickname())
                .phone(requestDto.getPhone())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();


        //User user = new User(username, password, nickname, phone, Collections.singleton(authority));
        userRepository.save(user);
        return user;
    }

    //해당 유저의 정보 및 권한 정보를 리턴
    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String username) {
        return userRepository.findOneWithAuthoritiesByUsername(username);
    }

    //SecurityUitil의 getCurrentUsername() 메소드가 리턴하는 username의 유저 및 권한 정보를 리턴
    @Transactional(readOnly = true)
    public Optional<User> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername);
    }



}
