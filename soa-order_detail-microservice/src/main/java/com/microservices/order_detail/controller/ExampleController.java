package com.microservices.order_detail.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/order_detail/")
public class ExampleController {

    @GetMapping("/example")
    public List<String> getExample() {
        return List.of("Hello", "from", "Order Detail", "Service");
    }
}
