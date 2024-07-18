package com.example.networker_test.domain.user;

public class User {
    String email;
    String password;
    String nationality;


    public User(String email, String password, String nationality) {
        if (email == null || password == null || nationality == null ||
                email.isBlank() || password.isBlank() || nationality.isBlank()){
            throw new IllegalArgumentException(String.format("잘못 입력하셨습니다."));
        }
        this.email = email;
        this.password = password;
        this.nationality = nationality;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNationality() {
        return nationality;
    }
}
