package com.example.networker_test.service.store;

import com.example.networker_test.domain.sotre.Product;
import com.example.networker_test.repository.store.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<Product> getProduct(){
        saveProduct();
        return productRepository.findAll();
    }

    public void saveProduct(){
        productRepository.save(new Product(1L, 5000L, "산타 마리아 올라운드 시즈닝", "../src/assets/spice.jpg" ));
        productRepository.save(new Product(2L, 7000L, "인도 홍차", "../src/assets/tea.jpg"));
        productRepository.save(new Product(3L, 10000L, "곽티슈 세트", "../src/assets/tisu.jpg"));
        productRepository.save(new Product(4L, 2500L, "미소시루", "../src/assets/miso.jpg"));
        productRepository.save(new Product(5L, 7000L, "Nước Chấm 소스", "../src/assets/nuocmom.jpg"));
    }


}
