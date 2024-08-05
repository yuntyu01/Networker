package com.example.networker_test.dto.order.orderResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailsResponse {
    private String created_at;
    private String image;
    private String productName;
    private String price;
    private String count;
    private String finalAmount;

    public OrderDetailsResponse(String created_at, String image, String productName, String price, String count, String finalAmount) {
        this.created_at = created_at;
        this.image = image;
        this.productName = productName;
        this.price = price;
        this.count = count;
        this.finalAmount = finalAmount;
    }
}
