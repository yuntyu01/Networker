package com.example.networker_test.controller.post;

import com.example.networker_test.CommonUtil;
import com.example.networker_test.domain.post.Post;
import com.example.networker_test.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

@Controller
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;
	private final CommonUtil commonUtil;

	@Value("${file.upload-dir}")
	private String uploadDir;

	@GetMapping("/list") // 게시물 리스트 페이지 연결
	public String list(Model model, @RequestParam(value="page", defaultValue = "0") int page) {
		if (page < 0) {
			page = 0; // 페이지 번호가 음수일 경우 0으로 설정
		}
		Page<Post> paging = this.postService.getList(page);
		model.addAttribute("paging", paging);
		return "board";
	}

	@GetMapping(value="/detail/{id}") // 특정 게시물의 페이지 연결
	public String detail(Model model, @PathVariable("id") Integer id) {
		Post post = this.postService.getPost(id);
		model.addAttribute("post", post);
		model.addAttribute("postContent", commonUtil.markdown(post.getContent())); // Markdown 내용 변환
		return "post";
	}

	@GetMapping("/create") // 게시물 등록 요청 페이지 연결
	public String postCreate() {
		return "createpost";
	}

	@PostMapping("/create") // 게시물 등록 처리
	public String createPost(@RequestParam(value="subject") String subject,
							 @RequestParam(value="content") String content,
							 @RequestParam(value="file", required = false) MultipartFile file) {
		try {
			if (file != null && !file.isEmpty()) {
				String fileName = file.getOriginalFilename();
				Path destinationPath = Paths.get(uploadDir).resolve(fileName);
				File destinationFile = destinationPath.toFile();

				// 파일 저장
				file.transferTo(destinationFile);
			}

			// 게시글 생성
			this.postService.create(subject, content);
			return "redirect:/post/list"; // 저장 후 목록으로
		} catch (IOException e) {
			e.printStackTrace();
			return "파일 업로드 실패";
		}
	}

	@PostMapping("/uploadImage") // 이미지 업로드 처리
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

	@GetMapping("/files/{filename:.+}") // 파일 서빙
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
}
