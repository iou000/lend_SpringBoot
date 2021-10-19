package com.weedkim.lend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LendApplication.class, args);
    }

}
