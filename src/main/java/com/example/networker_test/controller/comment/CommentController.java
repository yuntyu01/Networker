package com.example.networker_test.controller.comment;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

	private final PostService postService; // 의존성 주입
	private final CommentService commentService; // 의존성 주입

	private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

	@PostMapping("/create/{id}") // 댓글 등록 처리
	public String createComment(
			@PathVariable("id") Integer id,
			@RequestParam(value = "content") String content,
			HttpSession session) {
		try {
			// 댓글 생성
			commentService.create(id, content, session);
			logger.info("Comment created successfully for post ID {}", id);
		} catch (Exception e) {
			logger.error("Error creating comment for post ID {}", id, e);
			return "redirect:/error";
		}

		return String.format("redirect:/post/detail/%s", id);
	}
}
