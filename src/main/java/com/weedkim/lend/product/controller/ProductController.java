package com.weedkim.lend.product.controller;

import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.models.ProductRepository;
import com.weedkim.lend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor // final로 선언된 멤버 변수를 자동으로 생성.
@RestController
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService ;

    //등록된 전체 상품 조회
    @GetMapping("api/products")
    public List<Product> getProducts() {

        List<Product> product = productService.getProduct();
        //응답
        return product;
    }

    //상품 등록
    @PostMapping("api/products")
    public Product createProduct(@RequestBody ProductRequestDto requestDto) {

        Product product = productService.createProduct(requestDto);
        //응답
        return product;
    }
}
