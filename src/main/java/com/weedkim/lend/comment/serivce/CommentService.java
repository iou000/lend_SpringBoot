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

    @Transactional
    public Comment createComment(CommentRequestDto requestDto, Product product, User user) {


        Comment comment = new Comment(requestDto, product, user);
        return commentRepository.save(comment);
    }
}
