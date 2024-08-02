package com.example.networker_test.dto.user.reponese;

public class UserResponse {
    private long id;
    private String nickname;
    private String email;
    private String nationality;
    private String password;

    public UserResponse(long id, String nickname, String email, String nationality, String password) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.nationality = nationality;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public String getEmail() {
        return email;
    }

    public String getNationality() {
        return nationality;
    }

    public String getPassword() {
        return password;
    }
}
