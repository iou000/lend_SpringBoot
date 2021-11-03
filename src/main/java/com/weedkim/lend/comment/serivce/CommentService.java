package com.weedkim.lend.comment.serivce;

import com.weedkim.lend.comment.dto.CommentRequestDto;
import com.weedkim.lend.comment.models.Comment;
import com.weedkim.lend.comment.models.CommentRepository;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.models.ProductRepository;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.user.models.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {
    final CommentRepository commentRepository;
    final ProductRepository productRepository;
    final UserRepository userRepository;

    @Transactional
    public Comment createComment(CommentRequestDto requestDto, Long productId, Long userId) {

        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            throw new NullPointerException("해당 상품이 존재하지 않습니다.");
        }
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            throw new NullPointerException("해당 상품이 존재하지 않습니다.");
        }

        Comment comment = new Comment(requestDto, product.get(), user.get());
        return commentRepository.save(comment);
    }
}
