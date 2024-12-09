package com.microservices.order.controller;

import com.microservices.order.models.Order;
import com.microservices.order.services.OrderServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {


    private final OrderServiceImpl orderService;

    public OrderController(OrderServiceImpl orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/save")
    public Order save(@RequestBody Order orderDetail){
        return orderService.saveOrder(orderDetail);
    }

    @GetMapping("/find/{id}")
    public Order findById(@PathVariable Long id){
        return orderService.getOrderById(id);
    }

    @GetMapping("/findAll")
    public List<Order> findAll(){
        return orderService.getOrder();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        orderService.deleteOrder(id);
    }

    @PutMapping("/update/{id}")
    public Order update(@PathVariable Long id, @RequestBody Order order){

        Order existingProduct = orderService.getOrderById(id);
        if(existingProduct != null){
            existingProduct.setId_user(order.getId_user());
            existingProduct.setDate_order(order.getDate_order());
            existingProduct.setStatus(order.getStatus());
            existingProduct.setTotal(order.getTotal());

            return orderService.saveOrder(existingProduct);
        }else{
            throw new RuntimeException("Order not found with id " + id);
        }



    }

    @GetMapping("/example")
    public String example(){
        return "Hello World in Order Microservice";
    }
}
