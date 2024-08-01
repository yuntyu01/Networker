package com.example.networker_test.repository.order;

import com.example.networker_test.domain.order.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderInfoRepository extends JpaRepository<OrderInfo, String> {

}
