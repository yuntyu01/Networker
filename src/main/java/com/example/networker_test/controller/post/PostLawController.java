package com.example.networker_test.controller.post;

import com.example.networker_test.CommonUtil;
import com.example.networker_test.domain.comment.CommentForm;
import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.domain.post.PostLawForm;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.service.comment.CommentLawService;
import com.example.networker_test.service.post.PostLawService;
import com.example.networker_test.service.post.PostRecommendationService;
import com.example.networker_test.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Controller
@RequestMapping("/lawsupport")
@RequiredArgsConstructor
public class PostLawController {
    @Autowired
    private final PostLawService postLawService;
    private final CommentLawService commentLawService;
    private final UserService userService;
    private final CommonUtil commonUtil;
    private final PostRecommendationService postRecommendationService;

    @GetMapping("/post/latest")
    public List<PostLaw> getLatestPosts() {
        return postLawService.findLatestPosts();
    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/main")
    public String list(Model model, @RequestParam(value="page", defaultValue = "0") int page, @RequestParam(value = "kw", defaultValue = "") String kw) {
        if (page < 0) {
            page = 0; // 페이지 번호가 음수일 경우 0으로 설정
        }
        Page<PostLaw> paging = this.postLawService.getList(page, kw);
        model.addAttribute("paging", paging);
        model.addAttribute("kw", kw);
        return "lawsupport";
    }

    @GetMapping("/detail/{id}")
    public String detail(Model model, @PathVariable("id") Integer id, CommentForm commentForm) {
        PostLaw postLaw = this.postLawService.getPost(id);
        model.addAttribute("postLaw", postLaw); // postLaw 객체를 모델에 추가
        model.addAttribute("postContent", commonUtil.markdown(postLaw.getContent())); // Markdown 내용 변환
        return "post_law";
    }

    @GetMapping("/create")
    public String postCreate(PostLawForm postLawForm) {
        return "createpost_law";
    }

    @PostMapping("/create")
    public String createPost(@Valid PostLawForm postLawForm, BindingResult bindingResult,
                             @RequestParam(value="file", required = false) MultipartFile file,
                             HttpSession session) {
        if (bindingResult.hasErrors()) {
            return "createpost_law";
        }

        try {
            // 세션에서 로그인된 사용자 가져오기
            User user = (User) session.getAttribute("user");
            if (user == null) {
                return "redirect:/views/login.html"; // 로그인 페이지로 리다이렉트
            }

            // 파일이 업로드 되었는지 확인하고 처리
            if (file != null && !file.isEmpty()) {
                String fileName = file.getOriginalFilename();
                Path destinationPath = Paths.get(uploadDir).resolve(fileName);
                File destinationFile = destinationPath.toFile();

                // 파일 저장
                file.transferTo(destinationFile);
            }

            // 게시글 생성
            this.postLawService.create(postLawForm.getSubject(), postLawForm.getContent(), session);
            return "redirect:/lawsupport/main";
        } catch (IOException e) {
            e.printStackTrace();
            return "파일 업로드 실패";
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            Path destinationPath = Paths.get(uploadDir).resolve(fileName);
            File destinationFile = destinationPath.toFile();

            // 파일 저장
            file.transferTo(destinationFile);

            // 파일의 URL 생성
            String fileUrl = "/lawsupport/files/" + fileName;
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
        }
    }

    @GetMapping("/lawsupport/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().body(resource);
            } else {
                throw new RuntimeException("파일을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            throw new RuntimeException("파일을 읽을 수 없습니다.");
        }
    }

    @PostMapping("/commentlaw/{postId}")
    public String createComment(@PathVariable("postId") Integer postId,
                                @RequestParam(value="content") String content,
                                HttpSession session) {
        try {
            // 게시물 가져오기
            PostLaw postLaw = postLawService.getPost(postId);

            // 댓글 생성
            commentLawService.create(postId, content, session);

            return String.format("redirect:/lawsupport/detail/%s", postId);
        } catch (Exception e) {
            e.printStackTrace();
            return "댓글 등록 실패";
        }
    }

    @GetMapping("/lawsupport/modify/{id}")
    public String showModifyForm(@PathVariable("id") Integer id, Model model, HttpSession session) {
        // 게시물 조회
        PostLaw postLaw = postLawService.getPost(id);

        // 세션에서 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getNickname().equals(postLaw.getAuthor().getNickname())) {
            return "redirect:/views/login.html"; // 로그인되지 않았거나 권한이 없는 경우 리다이렉트
        }

        // 게시물 정보를 폼에 맞게 설정
        PostLawForm postLawForm = new PostLawForm(null, null);
        postLawForm.setSubject(postLaw.getSubject());
        postLawForm.setContent(postLaw.getContent());

        model.addAttribute("postForm", postLawForm);
        model.addAttribute("postId", id);

        return "modifypost_law"; // 수정 폼 템플릿
    }

    @GetMapping("/modify/{id}")
    public String modifyPostLawForm(@PathVariable("id") Integer id, Model model, HttpSession session) {
        PostLaw postLaw = postLawService.getPost(id);
        // 세션에서 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getNickname().equals(postLaw.getAuthor().getNickname())) {
            return "redirect:/login"; // 권한이 없는 경우 로그인 페이지로 리다이렉트
        }
        model.addAttribute("postForm", new PostLawForm(postLaw.getSubject(), postLaw.getContent()));
        model.addAttribute("postId", id);
        return "modifypost_law"; // 수정 폼을 표시할 템플릿 이름
    }

    @PostMapping("/modify/{id}")
    public String modifyPost(@PathVariable("id") Integer id,
                             @Valid @ModelAttribute("postForm") PostLawForm postForm,
                             BindingResult bindingResult,
                             HttpSession session) {
        if (bindingResult.hasErrors()) {
            return "modifypost_law"; // 폼 검증 오류가 있는 경우 수정 폼을 다시 표시
        }

        PostLaw postLaw = postLawService.getPost(id);
        // 세션에서 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getNickname().equals(postLaw.getAuthor().getNickname())) {
            return "redirect:/views/login.html"; // 로그인되지 않았거나 권한이 없는 경우 리다이렉트
        }

        postLaw.setSubject(postForm.getSubject());
        postLaw.setContent(postForm.getContent());
        postLawService.update(postLaw);

        return "redirect:/lawsupport/detail/" + id; // 수정 후 상세 페이지로 리다이렉트
    }

    @PostMapping("/delete/{id}")
    public String deletePost(@PathVariable("id") Integer id, HttpSession session) {
        try {
            // 현재 사용자 정보를 가져옵니다.
            User currentUser = (User) session.getAttribute("user");
            if (currentUser == null) {
                return "redirect:/views/login.html"; // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
            }

            // 게시물을 가져옵니다.
            PostLaw postLaw = postLawService.getPost(id);
            if (postLaw.getAuthor() == null || !postLaw.getAuthor().getId().equals(currentUser.getId())) {
                return "redirect:/lawsupport/main"; // 작성자가 아닌 경우 게시물 목록 페이지로 리다이렉트
            }

            // 게시물 삭제
            postLawService.delete(id);
            return "redirect:/lawsupport/main"; // 게시물 삭제 후 목록 페이지로 리다이렉트
        } catch (Exception e) {
            e.printStackTrace();
            return "게시물 삭제 실패";
        }
    }

    @PostMapping("/recommend/{id}")
    public String recommendPost(@PathVariable("id") Integer id, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser == null) {
            return "redirect:/views/login.html"; // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        }

        try {
            postRecommendationService.recommendPost(id, currentUser);
            return "redirect:/lawsupport/detail/" + id; // 추천 후 게시물 상세 페이지로 리다이렉트
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return "redirect:/lawsupport/detail/" + id + "?error=recommendation"; // 이미 추천한 경우
        }
    }
}
