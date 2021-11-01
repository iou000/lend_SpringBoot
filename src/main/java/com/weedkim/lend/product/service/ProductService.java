package com.weedkim.lend.product.service;

import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.models.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

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

    //상품 등록
    @Transactional
    public Product createProduct(ProductRequestDto requestDto, Long id) {
        Product product = new Product(requestDto, id);
        productRepository.save(product);

        return product;
    }

}
