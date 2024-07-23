package com.example.networker_test.service.inquiry;

import com.example.networker_test.domain.user.User;
import com.example.networker_test.dto.inquiry.request.InquiryRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class InquiryService {
    private final JavaMailSender mailSender;

    public InquiryService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public ResponseEntity<String> sendInquiry(@RequestBody InquiryRequest inquiryRequest, HttpSession session) {
        User user = (User) session.getAttribute("user");

        String subject = "Networker 문의 : " + inquiryRequest.getInquiryType() + "(" + user.getEmail() + ")";
        String text = "아이디 : " +  user.getEmail() + " / 닉네임 :" + user.getNickname() + "\n \n"
                + "문의 종류 : " + inquiryRequest.getInquiryType() + "\n\n"
                + "내용 : " + inquiryRequest.getContent() + "\n\n"
                + "희망 수신 Email: " + inquiryRequest.getEmail();

        try {
            sendEmail(" 받을 이메일 / 문의 전용 계정 생성 필요", subject, text);
            return ResponseEntity.ok("문의가 성공적으로 접수되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문의 접수 중 오류가 발생했습니다.");
        }
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("yunty01@gmail.com / 발신자 이메일 주소 설정 근데 안 바뀌는 거 같음 yml 설정대로 되는 거 같음");

        mailSender.send(message);
    }
}

