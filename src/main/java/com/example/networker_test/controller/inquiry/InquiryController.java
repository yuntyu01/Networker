package com.example.networker_test.controller.inquiry;

import com.example.networker_test.dto.inquiry.request.InquiryRequest;
import com.example.networker_test.service.inquiry.InquiryService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping("/inquiry")
    public ResponseEntity<String> sendInquiry(@RequestBody InquiryRequest inquiryRequest, HttpSession session) {
        return inquiryService.sendInquiry(inquiryRequest, session);
    }
}