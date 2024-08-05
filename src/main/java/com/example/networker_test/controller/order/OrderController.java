package com.example.networker_test.controller.order;

import com.example.networker_test.dto.order.OrderIdDTO;
import com.example.networker_test.dto.order.UserEmailDTO;
import com.example.networker_test.dto.order.orderResponse.OrderResponse;
import com.example.networker_test.dto.order.request.OrderData;
import com.example.networker_test.service.order.OrderService;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@Controller
public class OrderController {

    private final OrderService orderService;

    private static final Logger logger = Logger.getLogger(OrderController.class.getName());

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @RequestMapping(value = "/confirm")
    public ResponseEntity<JSONObject> confirmPayment(@RequestBody String jsonBody) throws Exception {
        return orderService.confirmPayment(jsonBody);
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> processOrder(@RequestBody OrderData orderData) {
        return orderService.processOrder(orderData);
    }

    @GetMapping("/payinfo")
    public ResponseEntity<?> getPaymentInfo(@RequestParam String orderId) {
        return orderService.getPaymentInfo(orderId);
    }
    @PostMapping("/orderinfo")
    public ResponseEntity<?> getOrderHistory(@RequestBody UserEmailDTO userEmailDTO) {
        logger.info("Received userEmail: " + userEmailDTO.getUserEmail());
        return orderService.getOrderHistory(userEmailDTO.getUserEmail());
    }

    @PostMapping("/orderdetails")
    public ResponseEntity<?> getOrderDetails(@RequestBody OrderIdDTO orderIdDTO) {
        logger.info("Received orderId: " + orderIdDTO.getOrderId());
        return orderService.getOrderDetails(orderIdDTO.getOrderId());
    }
}
