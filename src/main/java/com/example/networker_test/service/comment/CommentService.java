package com.example.networker_test.service.comment;

import java.time.LocalDateTime;

import com.example.networker_test.domain.comment.Comment;
import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.repository.comment.CommentRepository;
import com.example.networker_test.repository.post.PostRepository;
import com.example.networker_test.repository.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final UserRepository userRepository;
	private final PostRepository postRepository;

	public void create(Integer postId, String content, HttpSession session) {
		// 세션에서 사용자 정보 가져오기
		User user = (User) session.getAttribute("user");
		if (user == null) {
			throw new RuntimeException("User not found in session");
		}

		// 게시물 ID로 게시물 찾기
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new RuntimeException("Post not found"));

		// 댓글 객체 생성 및 설정
		Comment comment = new Comment();
		comment.setContent(content);
		comment.setCreateDate(LocalDateTime.now());
		comment.setPost(post); // 댓글이 속하는 게시물 설정
		comment.setAuthor(user); // 댓글 작성자 설정

		// 댓글 저장
		commentRepository.save(comment);
	}
}
