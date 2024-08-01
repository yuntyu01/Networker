package com.example.networker_test.controller.post;

import com.example.networker_test.CommonUtil;
import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.service.comment.CommentService;
import com.example.networker_test.service.post.PostService;
import com.example.networker_test.service.user.UserService; // UserService 추가
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;
	private final CommentService commentService;
	private final UserService userService; // UserService 추가
	private final CommonUtil commonUtil;

	@Value("${file.upload-dir}")
	private String uploadDir;

	@GetMapping("/list")
	public String list(Model model, @RequestParam(value="page", defaultValue = "0") int page) {
		if (page < 0) {
			page = 0; // 페이지 번호가 음수일 경우 0으로 설정
		}
		Page<Post> paging = this.postService.getList(page);
		model.addAttribute("paging", paging);
		return "board";
	}

	@GetMapping("/detail/{id}")
	public String detail(Model model, @PathVariable("id") Integer id) {
		Post post = this.postService.getPost(id);
		model.addAttribute("post", post);
		model.addAttribute("postContent", commonUtil.markdown(post.getContent())); // Markdown 내용 변환
		return "post";
	}

	@GetMapping("/create")
	public String postCreate() {
		return "createpost";
	}

	@PostMapping("/create")
	public String createPost(@RequestParam(value="subject") String subject,
							 @RequestParam(value="content") String content,
							 @RequestParam(value="file", required = false) MultipartFile file,
							 HttpSession session) {
		try {
			// 세션에서 로그인된 사용자 가져오기
			User user = (User) session.getAttribute("user");
			if (user == null) {
				return "redirect:/login"; // 로그인 페이지로 리다이렉트
			}

			if (file != null && !file.isEmpty()) {
				String fileName = file.getOriginalFilename();
				Path destinationPath = Paths.get(uploadDir).resolve(fileName);
				File destinationFile = destinationPath.toFile();

				// 파일 저장
				file.transferTo(destinationFile);
			}

			// 게시글 생성
			this.postService.create(subject, content, session);
			return "redirect:/post/list";
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
			String fileUrl = "/post/files/" + fileName;
			return ResponseEntity.ok(fileUrl);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
		}
	}

	@GetMapping("/files/{filename:.+}")
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


	@PostMapping("/comment/{postId}")
	public String createComment(@PathVariable("postId") Integer postId,
								@RequestParam(value="content") String content,
								HttpSession session) {
		try {
			// 게시물 가져오기
			Post post = postService.getPost(postId);

			// 댓글 생성
			commentService.create(postId, content, session);

			return String.format("redirect:/post/detail/%s", postId);
		} catch (Exception e) {
			e.printStackTrace();
			return "댓글 등록 실패";
		}

	}
}
