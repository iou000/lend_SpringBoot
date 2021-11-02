package com.weedkim.lend.product.service;

import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.models.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    //모든 상품 받아오기
    public List<Product> getProduct() {
        return productRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    //검색 상품 받아오기
    public List<Product> getSearchProduct(String query) {
        return productRepository.findAllByTitleContainingIgnoreCase(query);
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해상 상품이 존재하지 않습니다.")
        );
    }

    //상품 등록
    @Transactional
    public Product createProduct(ProductRequestDto requestDto, Long id, String postUserNickname) {
        Product product = new Product(requestDto, id, postUserNickname);
        productRepository.save(product);

        return product;
    }

}
