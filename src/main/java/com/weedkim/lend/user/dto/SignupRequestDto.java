package com.weedkim.lend.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequestDto { //회원가입시 입력한 회원정보 Dto
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String nickname;
    private String phone;
    private boolean admin = false;
    private String adminToken = "";
}
