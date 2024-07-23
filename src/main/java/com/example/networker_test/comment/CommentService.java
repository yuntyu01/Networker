package com.example.networker_test.comment;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.networker_test.post.Post;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	
	private final CommentRepository commentRepository;
	
	public void create(Post post, String content) {
		Comment comment = new Comment();
		comment.setContent(content);
		comment.setCreateDate(LocalDateTime.now());
		comment.setPost(post);
		this.commentRepository.save(comment);
	}//댓글 생성 처리 연결(controller - entity)

}
