package com.example.networker_test.domain.review;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long companyId;
    private String summary;
    private String advantages;
    private String disadvantages;
    private int rating;
    private String createdAt;
}
