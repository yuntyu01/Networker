package com.example.networker_test.dto.inquiry.request;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

public class InquiryRequest {
    private String inquiryType;
    private String content;
    private String email;

    public String getInquiryType() {
        return inquiryType;
    }

    public void setInquiryType(String inquiryType) {
        this.inquiryType = inquiryType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}