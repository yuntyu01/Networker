package com.example.networker_test.controller.post;

import com.example.networker_test.controller.post.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/translate")
@RequiredArgsConstructor
public class TranslateController {
    private final TranslationService translationService;

    @PostMapping("/detect")
    public ResponseEntity<Map<String, String>> detectLanguage(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        String detectedLanguage = translationService.detectLanguage(text);

        Map<String, String> response = new HashMap<>();
        response.put("detectedLanguage", detectedLanguage);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> translate(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        String fromLanguage = request.get("fromLanguage");
        String toLanguage = request.get("toLanguage");
        String translatedText = translationService.translate(text, fromLanguage, toLanguage);

        Map<String, String> response = new HashMap<>();
        response.put("translatedText", translatedText);

        return ResponseEntity.ok(response);
    }
}

