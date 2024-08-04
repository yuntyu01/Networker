package com.example.networker_test.dto.order.orderResponse;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OrderResponse {
    private String productName;
    private String count;
    private String image;
    private String orderId;
    private String created_at;
    private String totalAmount;

    public OrderResponse(String productName, String count, String image, String orderId, String created_at, String totalAmount) {
        this.productName = productName;
        this.count = count;
        this.image = image;
        this.orderId = orderId;
        this.created_at = created_at;
        this.totalAmount = totalAmount;
    }
}
