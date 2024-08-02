package com.example.networker_test.service.comment;

import java.time.LocalDateTime;

import com.example.networker_test.domain.comment.Comment;
import com.example.networker_test.domain.comment.CommentLaw;
import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.repository.comment.CommentLawRepository;
import com.example.networker_test.repository.comment.CommentRepository;
import com.example.networker_test.repository.post.PostLawRepository;
import com.example.networker_test.repository.post.PostRepository;
import com.example.networker_test.repository.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class CommentLawService {

    private final CommentLawRepository commentLawRepository;
    private final UserRepository userRepository;
    private final PostLawRepository postLawRepository;

    private static final Logger logger = LoggerFactory.getLogger(CommentLawService.class);

    public void create(Integer postId, String content, HttpSession session) {
        try {

            User user = (User) session.getAttribute("user");
            if (user == null) {
                throw new RuntimeException("User not found in session");
            }

            PostLaw postLaw = postLawRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            CommentLaw commentLaw = new CommentLaw();
            commentLaw.setContent(content);
            commentLaw.setCreateDate(LocalDateTime.now());
            commentLaw.setPostLaw(postLaw);
            commentLaw.setAuthor(user);

            commentLawRepository.save(commentLaw);
        } catch (Exception e) {
            logger.error("Error creating comment", e);
            throw e;
        }
    }
}
