package com.weedkim.lend.product.controller;

import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.models.ProductRepository;
import com.weedkim.lend.product.service.ProductService;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor // final로 선언된 멤버 변수를 자동으로 생성.
@RestController
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService ;
    private final UserService userService;
    //등록된 전체 상품 조회
    @GetMapping("api/products")
    public List<Product> getProducts() {

        List<Product> product = productService.getProduct();
        //응답
        return product;
    }

    //상품 등록
    @PostMapping("api/createProducts")
    public Product createProduct(@RequestBody ProductRequestDto requestDto) {
        ResponseEntity<User> user = ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
        Long userId = user.getBody().getUserId();
        Product product = productService.createProduct(requestDto, userId);
        //응답
        return product;
    }
}
