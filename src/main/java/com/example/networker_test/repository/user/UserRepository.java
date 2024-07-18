package com.example.networker_test.repository.user;

import com.example.networker_test.dto.user.reponese.UserResponse;
import com.example.networker_test.dto.user.request.UserCreateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class UserRepository {

    private JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public void signupUser(UserCreateRequest request){
        String sql = "INSERT INTO user (email, nationality, password) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, request.getEmail(), request.getNationality(), request.getPassword());
    }

    public List<UserResponse> getUsers() {
        String sql = "SELECT * FROM user";
        return jdbcTemplate.query(sql, new RowMapper<UserResponse>() {
            @Override
            public UserResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
                long id = rs.getLong("id");
                String email = rs.getString("email");
                String nationality = rs.getString("nationality");
                String password = rs.getString("password");
                return new UserResponse(id, email, nationality, password);
            }
        });
    }
}
