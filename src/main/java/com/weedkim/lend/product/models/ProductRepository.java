package com.weedkim.lend.product.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    //검색어(제목)를 포함한 상품 조회
    List<Product> findAllByTitleContainingIgnoreCase(String title);
}
