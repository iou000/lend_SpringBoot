package com.weedkim.lend.product.controller;

import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.service.ProductService;
import com.weedkim.lend.user.models.User;
import com.weedkim.lend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor // final로 선언된 멤버 변수를 자동으로 생성.
@RestController
public class ProductController {

    private final ProductService productService ;
    private final UserService userService;

    //등록된 전체 상품 조회
    @GetMapping("/api/products")
    public List<Product> getProducts() {
        //응답
        return productService.getProduct();
    }

    //검색 상품 조회
    @GetMapping("/api/search/products")
    public List<Product> getSearchProducts(@RequestParam String query) {
       //응답
       return productService.getSearchProduct(query);
    }

    //상품 상세
    @GetMapping("/api/product/{id}")
    public Product getProduct(@PathVariable Long id) {
        //응답
        return productService.getProduct(id);
    }


    //상품 등록
    @PostMapping("/api/createProducts")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public Product createProduct(@RequestBody ProductRequestDto requestDto) {
        // 현재 Security Context에 저장되어 있는 인증 정보의 username을 기준으로 한 유저 정보 및 권한 정보를 리턴
        // 토큰을 통해 유저정보를 리턴해주는거임
        User user = userService.getMyUserWithAuthorities().get(); //.get()은 Optional타입이라서
        //응답
        return productService.createProduct(requestDto, user);
    }

}
