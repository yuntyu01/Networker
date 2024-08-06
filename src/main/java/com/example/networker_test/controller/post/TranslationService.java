package com.example.networker_test.controller.post;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TranslationService {

    @Value("${azure.translation.api-key}")
    private String apiKey;

    @Value("${azure.translation.endpoint}")
    private String endpoint;

    @Value("${azure.translation.region}")
    private String region;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String detectLanguage(String text) {
        String url = String.format("%s/detect?api-version=3.0", endpoint);

        // Prepare request body
        String requestBody = "[{\"Text\":\"" + text + "\"}]";

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Ocp-Apim-Subscription-Key", apiKey);
        headers.set("Ocp-Apim-Subscription-Region", region);

        // Create request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make request
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            try {
                // Parse response
                JsonNode root = objectMapper.readTree(responseEntity.getBody());
                return root.get(0).get("language").asText();
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse language detection response", e);
            }
        } else {
            throw new RuntimeException("Language detection API call failed: " + responseEntity.getStatusCode());
        }
    }

    public String translate(String text, String fromLanguage, String toLanguage) {
        String url = String.format("%s/translate?api-version=3.0&from=%s&to=%s", endpoint, fromLanguage, toLanguage);

        // Prepare request body
        String requestBody = "[{\"Text\":\"" + text + "\"}]";

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Ocp-Apim-Subscription-Key", apiKey);
        headers.set("Ocp-Apim-Subscription-Region", region);

        // Create request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make request
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            try {
                // Parse response
                JsonNode root = objectMapper.readTree(responseEntity.getBody());
                return root.get(0).get("translations").get(0).get("text").asText();
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse translation response", e);
            }
        } else {
            throw new RuntimeException("Translation API call failed: " + responseEntity.getStatusCode());
        }
    }
}
