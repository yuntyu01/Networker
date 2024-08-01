package com.example.networker_test.controller.comment;

import com.example.networker_test.domain.post.Post;
import com.example.networker_test.service.comment.CommentService;
import com.example.networker_test.service.post.PostService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

	private final PostService postService; // 의존성 주입
	private final CommentService commentService; // 의존성 주입

	@PostMapping("/create/{id}") // 댓글 등록 처리
	public String createComment(Model model,
								@PathVariable("id") Integer id,
								@RequestParam(value = "content") String content,
								HttpSession session) {
		Post post = this.postService.getPost(id); // 게시물 가져오기
		this.commentService.create(id, content, session);
		return String.format("redirect:/post/detail/%s", id); // 댓글 등록 후 페이지 리다이렉트
	}
}
