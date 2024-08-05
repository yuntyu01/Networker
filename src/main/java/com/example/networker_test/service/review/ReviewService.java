package com.example.networker_test.service.review;
import com.example.networker_test.domain.review.Review;
import com.example.networker_test.repository.review.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByCompanyId(Long companyId) {
        return reviewRepository.findByCompanyId(companyId);
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review updateReview(Long id, Review updatedReview) {
        Optional<Review> existingReviewOpt = reviewRepository.findById(id);
        if (existingReviewOpt.isPresent()) {
            Review existingReview = existingReviewOpt.get();
            existingReview.setSummary(updatedReview.getSummary());
            existingReview.setAdvantages(updatedReview.getAdvantages());
            existingReview.setDisadvantages(updatedReview.getDisadvantages());
            existingReview.setRating(updatedReview.getRating());
            existingReview.setCreatedAt(updatedReview.getCreatedAt());
            return reviewRepository.save(existingReview);
        } else {
            throw new RuntimeException("Review not found");
        }
    }
}
