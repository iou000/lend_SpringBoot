package com.weedkim.lend.user.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    //회원 아이디(username)로 DB 조회
    Optional<User> findByUsername(String username);
}
