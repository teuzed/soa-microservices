package com.microservices.order_detail.controller;


import com.microservices.order_detail.models.OrderDetail;
import com.microservices.order_detail.services.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/order_detail/")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping("/save")
    public OrderDetail save(@RequestBody OrderDetail orderDetail){
        return orderDetailService.saveOrderDetail(orderDetail);
    }

    @GetMapping("/find/{id}")
    public OrderDetail findById(@PathVariable Long id){
        return orderDetailService.getOrderDetailById(id);
    }

    @GetMapping("/findAll")
    public List<OrderDetail> findAll(){
        return orderDetailService.getOrderDetails();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        orderDetailService.deleteOrderDetail(id);
    }

}
