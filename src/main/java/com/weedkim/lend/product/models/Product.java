package com.weedkim.lend.product.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.weedkim.lend.comment.models.Comment;
import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.utils.URLValidator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
public class Product extends Timestamped {

    // ID 자동 생성 및 증가
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false) //반드시 값을 가져야 함
    private String imgURL;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String detail;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private int price_hour;

    @Column(nullable = false)
    private int price_day;

    @Column(nullable = false)
    private int viewCnt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Comment> comments;


    public Product(ProductRequestDto requestDto, User user) {
        // 입력값 Validation
        if (user.getUserId() == null || user.getUserId() < 0) {
            throw new IllegalArgumentException("유효하지 않은 회원입니다.");
        }
        if (requestDto.getTitle() == null || requestDto.getTitle().isEmpty()) {
            throw new IllegalArgumentException("상품 제목이 올바르지 않습니다.");
        }
        if (requestDto.getLocation() == null || requestDto.getLocation().isEmpty()) {
            throw new IllegalArgumentException("지역이 올바르지 않습니다.");
        }
        if (!URLValidator.urlValidator(requestDto.getImgURL())) {
            throw new IllegalArgumentException("상품 이미지 URL 포맷이 맞지 않습니다.");
        }
        if (requestDto.getType() == null || requestDto.getType().isEmpty()) {
            throw new IllegalArgumentException("상품 타입이 올바르지 않습니다.");
        }
        if (requestDto.getDetail() == null || requestDto.getDetail().isEmpty()) {
            throw new IllegalArgumentException("상품 설명이 올바르지 않습니다.");
        }
        if (requestDto.getPrice_hour() <= 0) {
            throw new IllegalArgumentException("상품 가격(시간)이 올바르지 않습니다.");
        }
        if (requestDto.getPrice_day() <= 0) {
            throw new IllegalArgumentException("상품 가격(일)이 올바르지 않습니다.");
        }

        this.title = requestDto.getTitle();
        this.location = requestDto.getLocation();
        this.imgURL = requestDto.getImgURL();
        this.type = requestDto.getType();
        this.detail = requestDto.getDetail();
        this.price_hour = requestDto.getPrice_hour();
        this.price_day = requestDto.getPrice_day();
        this.user = user;
    }

    public void increaseViewCnt() {
        this.viewCnt++;
    }
}
