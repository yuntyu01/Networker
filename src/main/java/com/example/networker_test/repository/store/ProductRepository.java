package com.example.networker_test.repository.store;

import com.example.networker_test.domain.store.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByName (String Name);
}
