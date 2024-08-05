package com.example.networker_test.repository.imformation;

import com.example.networker_test.domain.information.Information;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InformationRepository extends JpaRepository<Information, String> {
    List<Information> findByTitle(String title);
    List<Information> findByUrl(String url);
}
