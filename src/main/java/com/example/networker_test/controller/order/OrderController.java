package com.example.networker_test.controller.order;

import com.example.networker_test.dto.order.request.OrderRequest;
import com.example.networker_test.service.order.OrderService;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OrderController {

    private final OrderService orderService;


    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @RequestMapping(value = "/confirm")
    public ResponseEntity<JSONObject> confirmPayment(@RequestBody String jsonBody) throws Exception {
        return orderService.confirmPayment(jsonBody);
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> processOrder(@RequestBody OrderRequest.OrderData orderData) {
        return orderService.processOrder(orderData);
    }


}
