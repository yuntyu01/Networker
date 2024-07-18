package com.example.networker_test.controller.sign;

import com.example.networker_test.dto.user.request.UserCreateRequest;
import com.example.networker_test.dto.user.reponese.UserResponse;
import com.example.networker_test.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
public class SignupController {

    private final UserService userService;

    public SignupController(JdbcTemplate jdbcTemplate) {
        this.userService = new UserService(jdbcTemplate);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody UserCreateRequest request) {
        return userService.signupUser(request);
    }

    @GetMapping("/signup")
    public List<UserResponse> getUsers() {
        return userService.getUsers();
    }
}
