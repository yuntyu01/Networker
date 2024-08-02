package com.example.networker_test.repository.post;

import com.example.networker_test.domain.post.PostLaw;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostLawRepository extends JpaRepository<PostLaw, Integer> {
    PostLaw findBySubject(String subject);
    PostLaw findBySubjectAndContent(String subject, String content);
    List<PostLaw> findBySubjectLike(String subject);
    Page<PostLaw> findAll(Pageable pageable);
    Page<PostLaw> findAll(Specification<PostLaw> spec, Pageable pageable);

    @Query(value = "SELECT * FROM post_law ORDER BY create_date DESC LIMIT 2", nativeQuery = true)
    List<PostLaw> findTop2ByOrderByCreateDateDesc();
}
