package com.weedkim.lend.comment.controller;

import com.weedkim.lend.comment.dto.CommentRequestDto;
import com.weedkim.lend.comment.models.Comment;
import com.weedkim.lend.comment.serivce.CommentService;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor // final로 선언된 멤버 변수를 자동으로 생성.
@RestController
public class CommentController {

    final CommentService commentService;
    final UserService userService;


    //댓글 등록
    @PostMapping("/api/product/{productId}/comment")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    private Comment createComment(@PathVariable Long productId, @RequestBody CommentRequestDto requestDto) {
        // 현재 Security Context에 저장되어 있는 인증 정보의 username을 기준으로 한 유저 정보 및 권한 정보를 리턴
        // 토큰을 통해 유저정보를 리턴해주는거임
        User user = userService.getMyUserWithAuthorities().get(); //.get()은 Optional타입이라서
        Long userId = user.getUserId();
        return commentService.createComment(requestDto, productId, userId);
    }


}
