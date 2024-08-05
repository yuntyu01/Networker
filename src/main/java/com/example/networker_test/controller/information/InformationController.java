package com.example.networker_test.controller.information;

import com.example.networker_test.domain.information.Information;
import com.example.networker_test.domain.store.Product;
import com.example.networker_test.service.information.InformationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InformationController {

    private final InformationService informationService;

    public InformationController(InformationService informationService) {
        this.informationService = informationService;
    }

    @GetMapping("/infolist")
    public List<Information> getInfolist (){
        return informationService.getInformation();
    }
}
