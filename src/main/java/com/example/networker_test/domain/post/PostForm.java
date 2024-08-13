package com.example.networker_test.domain.post;

import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "postform")
public class PostForm {
    @NotEmpty(message="제목을 입력해주세요")
    @Size(max=200)
    private String subject;

    @NotEmpty(message="내용을 입력해주세요")
    private String content;
    public PostForm(String subject, String content) {
        this.subject = subject;
        this.content = content;
    }

}