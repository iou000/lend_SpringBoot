package com.weedkim.lend.product.models;

import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.user.models.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@Entity
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
    private Long userId;

    @Column(nullable = false)
    private String postUserNickname;


    public Product(ProductRequestDto requestDto, Long userId, String postUserNickname) {
        this.imgURL = requestDto.getImgURL();
        this.title = requestDto.getTitle();
        this.type = requestDto.getType();
        this.detail = requestDto.getDetail();
        this.location = requestDto.getLocation();
        this.price_hour = requestDto.getPrice_hour();
        this.price_day = requestDto.getPrice_day();
        this.userId = userId;
        this.postUserNickname = postUserNickname;
    }

}
