package com.example.networker_test.repository.post;

import com.example.networker_test.domain.post.Post;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {


}
