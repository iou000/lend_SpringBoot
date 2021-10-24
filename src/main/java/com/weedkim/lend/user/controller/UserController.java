package com.weedkim.lend.user.controller;


import com.weedkim.lend.user.dto.SignupRequestDto;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/user/signup")
    public User registerUser(@RequestBody SignupRequestDto requestDto) {
        User user = userService.registerUser(requestDto);
        return user;
    }

}
