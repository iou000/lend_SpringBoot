package com.weedkim.lend.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductRequestDto {

    private String image;
    private String title;
    private String type;
    private String detail;
    private String location;
    private int price_hour; //1일당 가격
    private int price_day; //1시간당 가격

}
