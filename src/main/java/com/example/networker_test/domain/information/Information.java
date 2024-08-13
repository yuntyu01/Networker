package com.example.networker_test.domain.information;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Information {
    @Id
    private String title;
    private String url;
    @Column(length = 1000)
    private String content;
    private String image;

    public Information(String title, String url, String content, String image) {
        this.title = title;
        this.url = url;
        this.content = content;
        this.image = image;
    }

    protected Information() {

    }
}
