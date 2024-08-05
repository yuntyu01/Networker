package com.example.networker_test.controller.review;
import com.example.networker_test.domain.review.Review;
import com.example.networker_test.service.review.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{companyId}")
    public List<Review> getReviews(@PathVariable Long companyId) {
        return reviewService.getReviewsByCompanyId(companyId);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }
}
