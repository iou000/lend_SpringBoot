package com.weedkim.lend.product.dto;

import com.weedkim.lend.product.models.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductsResponseDto {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String imgURL;
    private String title;
    private String type;
    private String detail;
    private String location;
    private int price_hour; //1일당 가격
    private int price_day; //1시간당 가격



    public ProductsResponseDto(Product product) {
        this.id = product.getId();
        this.createdAt = product.getCreatedAt();
        this.modifiedAt = product.getModifiedAt();
        this.imgURL = product.getImgURL();
        this.title = product.getTitle();
        this.type = product.getType();
        this.detail = product.getDetail();
        this.location = product.getLocation();
        this.price_hour = product.getPrice_hour();
        this.price_day = product.getPrice_day();
    }
}
