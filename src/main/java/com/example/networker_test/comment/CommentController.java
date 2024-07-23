package com.example.networker_test.comment;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.networker_test.post.Post;
import com.example.networker_test.post.PostService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
	
	private final PostService postService;//의존성 주입
	private final CommentService commentService;//의존성 주입
	
	@PostMapping("/create/{id}")//댓글 등록 처리
	public String createComment(Model model, @PathVariable("id") Integer id, @RequestParam(value="content")String content) {
		Post post = this.postService.getPost(id);
		this.commentService.create(post,content);
		return String.format("redirect:/post/detail/%s", id);//댓글 등록 후 등록 확인을 위한 reload 
	}
	

}
