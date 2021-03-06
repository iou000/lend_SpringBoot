package com.weedkim.lend.user.controller;


import com.weedkim.lend.user.dto.SignupRequestDto;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/user/signup")
    public User registerUser(@RequestBody SignupRequestDto requestDto) {
        User user = userService.registerUser(requestDto);
        return user;
    }


    // 현재 Security Context에 저장되어 있는 인증 정보의 username을 기준으로 한 유저 정보 및 권한 정보를 리턴
    //토큰만 헤더에 담아서 보내면 유저정보가 리턴됨.
    //  @PreAuthorize(“hasAnyRole(‘USER’,’ADMIN’)”) 어노테이션을 이용해서 ROLE_USER, ROLE_ADMIN 권한 모두 호출 가능
    @GetMapping("/api/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public User getMyUserInfo() {
        return userService.getMyUserWithAuthorities().get(); //.get()은 Optional타입이라서
    }

    // 해당 username의 유저 정보 및 권한 정보를 리턴
    // @PreAuthorize(“hasAnyRole(‘ADMIN’)”) 어노테이션을 이용해서 ROLE_ADMIN 권한을 소유한 토큰만 호출 가능
    @GetMapping("/api/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public User getUserInfo(@PathVariable String username) {
        return userService.getUserWithAuthorities(username).get();
    }

}
