package com.example.networker_test.domain.review;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String createdAt;
}

