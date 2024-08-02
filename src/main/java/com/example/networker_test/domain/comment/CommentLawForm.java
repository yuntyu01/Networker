package com.example.networker_test.domain.comment;

import com.example.networker_test.domain.user.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentLawForm {
    @NotEmpty(message = "내용을 입력해주세요")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;
//템플릿에 글씨 적용 안함


}
