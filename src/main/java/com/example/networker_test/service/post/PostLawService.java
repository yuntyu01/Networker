package com.example.networker_test.service.post;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.networker_test.domain.comment.CommentLaw;
import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.repository.post.PostLawRepository;
import com.example.networker_test.repository.user.UserRepository;
import jakarta.persistence.criteria.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.networker_test.exception.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostLawService {
    private final PostLawRepository postLawRepository;
    private final UserRepository userRepository;

    public List<PostLaw> findLatestPosts() {
        return postLawRepository.findTop2ByOrderByCreateDateDesc();
    }

    public List<PostLaw> getList() {
        return this.postLawRepository.findAll();
    }

    public PostLaw getPost(Integer id) {
        Optional<PostLaw> postLaw = this.postLawRepository.findById(id);
        if (postLaw.isPresent()) {
            return postLaw.get();
        } else {
            throw new DataNotFoundException("E:POST NOT FOUND");
        }
    }

    public Page<PostLaw> getList(int page, String kw) {
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("createDate"));
        Pageable pageable = PageRequest.of(page, 30, Sort.by(sorts));
        Specification<PostLaw> spec = search(kw);
        return this.postLawRepository.findAll(spec, pageable);
    }

    public void create(String subject, String content, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            throw new RuntimeException("User not found in session");
        }

        PostLaw postLaw = new PostLaw();
        postLaw.setSubject(subject);
        postLaw.setContent(content);
        postLaw.setCreateDate(LocalDateTime.now());
        postLaw.setAuthor(user);

        this.postLawRepository.save(postLaw);
    }

    public void update(PostLaw postLaw) {
        if (postLaw.getId() == null || !postLawRepository.existsById(postLaw.getId())) {
            throw new IllegalArgumentException("게시물을 찾을 수 없습니다.");
        }
        postLawRepository.save(postLaw);
    }

    public void delete(Integer id) {
        if (!postLawRepository.existsById(id)) {
            throw new DataNotFoundException("게시물을 찾을 수 없습니다.");
        }
        postLawRepository.deleteById(id);
    }

    private Specification<PostLaw> search(String kw) {
        return new Specification<>() {
            private static final long serialVersionUID = 1L;

            @Override
            public Predicate toPredicate(Root<PostLaw> q, CriteriaQuery<?> query, CriteriaBuilder cb) {
                query.distinct(true);
                Join<PostLaw, User> u1 = q.join("author", JoinType.LEFT);
                Join<PostLaw, CommentLaw> a = q.join("commentLawList", JoinType.LEFT);
                Join<CommentLaw, User> u2 = a.join("author", JoinType.LEFT);
                return cb.or(cb.like(q.get("subject"), "%" + kw + "%"),
                        cb.like(q.get("content"), "%" + kw + "%"),
                        cb.like(u1.get("nickname"), "%" + kw + "%"),
                        cb.like(a.get("content"), "%" + kw + "%"),
                        cb.like(u2.get("nickname"), "%" + kw + "%"));
            }
        };
    }
}
