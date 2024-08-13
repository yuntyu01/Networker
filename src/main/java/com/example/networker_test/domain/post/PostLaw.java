package com.example.networker_test.domain.post;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.example.networker_test.domain.comment.CommentLaw;
import com.example.networker_test.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "postlaw")
public class PostLaw {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private Integer viewCount;

    private Integer recommendCount;

    @OneToMany(mappedBy = "postLaw", cascade = CascadeType.REMOVE)
    private List<CommentLaw> commentLawList;

//    @OneToMany(mappedBy = "post")
//    private Set<PostRecommendation> recommendations;
}
