package com.example.networker_test.controller.comment;

import com.example.networker_test.domain.comment.CommentLawForm;
import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.service.comment.CommentLawService;
import com.example.networker_test.service.post.PostLawService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/commentlaw")
@RequiredArgsConstructor
public class CommentLawController {

    private final PostLawService postLawService; // 의존성 주입
    private final CommentLawService commentLawService; // 의존성 주입
    private static final Logger logger = LoggerFactory.getLogger(CommentLawController.class);

    @PostMapping("/create/{id}") // 댓글 등록 처리
    public String createComment(
            Model model,
            @PathVariable("id") Integer id,
            @RequestParam(value = "content") String content,
            HttpSession session,
            @Valid CommentLawForm commentForm, BindingResult bindingResult) {
        PostLaw postLaw = this.postLawService.getPost(id);
        if (bindingResult.hasErrors()) {
            model.addAttribute("postLaw", postLaw); // 변경된 부분
            return "post_law"; // 변경된 부분
        } // 빈칸 작성 방지 및 비 로그인 사용자의 실수에 의한 빈칸에서 작성 클릭 시 페이지에서 안나가게 함

        try {
            // 댓글 생성
            commentLawService.create(id, content, session);
            logger.info("Comment created successfully for post ID {}", id);
        } catch (Exception e) {
            logger.error("Error creating comment for post ID {}", id, e);
            return "redirect:/views/login.html";
        }

        return String.format("redirect:/lawsupport/detail/%s", id);
    }
}
