package com.weedkim.lend.product.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 멤버 변수가 컬럼이 되도록 함. 생성,수정시간이 상속한 클래스에 멤버변수가 되도록 만들어줌.
@EntityListeners(AuditingEntityListener.class) // 변경되었을 때 자동으로 기록.
public abstract class Timestamped { //어차피 상속받아서만 사용할거니까 좀 더 명시적으로 abstract class로 선언.

    @CreatedDate // 최초 생성 시점
    private LocalDateTime createdAt;

    @LastModifiedDate // 마지막 변경 시점
    private LocalDateTime modifiedAt;
}
