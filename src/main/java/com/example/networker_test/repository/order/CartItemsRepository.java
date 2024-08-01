package com.example.networker_test.repository.order;

import com.example.networker_test.domain.order.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemsRepository extends JpaRepository<CartItems, Integer> {
}
