package com.weedkim.lend.product.service;

import com.weedkim.lend.product.dto.ProductRequestDto;
import com.weedkim.lend.product.models.Product;
import com.weedkim.lend.product.models.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    //모든 상품 받아오기
    public List<Product> getProduct() {
        return productRepository.findAll();
    }

    @Transactional
    public Product createProduct(ProductRequestDto requestDto, Long id) {
        Product product = new Product(requestDto, id);
        productRepository.save(product);

        return product;
    }

}
