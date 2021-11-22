package com.weedkim.lend.comment.serivce;

import com.weedkim.lend.comment.dto.CommentRequestDto;
import com.weedkim.lend.comment.models.Comment;
import com.weedkim.lend.comment.models.CommentRepository;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.user.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;

    //댓글 생성
    @Transactional
    public Comment createComment(CommentRequestDto requestDto, Product product, User user) {
        Comment comment = new Comment(requestDto, product, user);
        return commentRepository.save(comment);
    }

    //댓글 수정
    @Transactional
    public Long updateComment(Long id, CommentRequestDto requestDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("댓글이 존재하지 않습니다.")
        );
        comment.updateByComment(requestDto);
        return id;
    }

    //댓글 삭제
    @Transactional
    public Long removeComment(Long id) {
        commentRepository.deleteById(id);
        return id;
    }
}
