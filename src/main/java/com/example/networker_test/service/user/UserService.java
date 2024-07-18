package com.example.networker_test.service.user;

import com.example.networker_test.controller.sign.SignupController;
import com.example.networker_test.dto.user.reponese.UserResponse;
import com.example.networker_test.dto.user.request.UserCreateRequest;
import com.example.networker_test.repository.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class UserService {

    private final UserRepository userRepository;

    public UserService(JdbcTemplate jdbcTemplate){
        userRepository = new UserRepository(jdbcTemplate);
    }

    private final Logger logger = LoggerFactory.getLogger(SignupController.class);


    public ResponseEntity<String> signupUser(UserCreateRequest request) {
        logger.info("Received signup request: email={}, nationality={}, password={}",
                request.getEmail(), request.getNationality(), request.getPassword());

        try {
            userRepository.signupUser(request);
             return ResponseEntity.ok("회원가입이 성공적으로 완료되었습니다.");
        } catch (Exception e) {
            logger.error("Error occurred while signing up user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입에 실패했습니다. 다시 시도해주세요.");
        }

    }

    public List<UserResponse> getUsers(){
        return userRepository.getUsers();
    }
}
