package com.weedkim.lend.comment.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.weedkim.lend.comment.dto.CommentRequestDto;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.models.Timestamped;
import com.weedkim.lend.user.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "comment_id")
    private Long id;

    @Column
    private String content;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;


    public Comment(CommentRequestDto requestDto, Product product, User user) {
        this.content = requestDto.getContent();
        this.product = product;
        this.user = user;
    }

}
