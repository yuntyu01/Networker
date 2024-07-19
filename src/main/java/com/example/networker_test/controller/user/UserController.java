package com.example.networker_test.controller.user;

import com.example.networker_test.dto.user.request.UserCreateRequest;
import com.example.networker_test.dto.user.reponese.UserResponse;
import com.example.networker_test.service.user.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody UserCreateRequest request) {
        return userService.signupUser(request);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserCreateRequest request, HttpSession session) {
        return userService.loginUser(request, session);
    }

    @GetMapping("/signup")
    public List<UserResponse> getUsers() {
        return userService.getUsers();
    }
}