package com.microservices.payment.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payment/")
public class ExampleController {

    @GetMapping("/example")
    public List<String> getExample() {

        return List.of("Hello", "from", "Payment", "Service");
    }

}
