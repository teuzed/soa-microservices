package com.microservices.order.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/order/")
public class ExampleController {



    @GetMapping("/example")
    public String getExample() {
        return "Hello from Order Service";
    }
}
