package com.weedkim.lend.user.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequestDto { //회원가입시 입력한 회원정보 Dto
    private String username;
    private String password;
    private String nickname;
    private String phone;
    private boolean admin = false;
    private String adminToken = "";
}
