package com.microservices.user.controller;

import com.microservices.user.models.User;
import com.microservices.user.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/")
public class UserController {


    @Autowired
    private UserServiceImpl userService;


    @PostMapping("/save")
    public User save(@RequestBody User user){
        return userService.save(user);
    }

    @GetMapping("find/{id}")
    public User findById(@PathVariable Long id){
        return userService.findById(id);
    }

    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable Long id){
        userService.deleteById(id);
    }

    @PostMapping("/update")
    public User update(User user){

        User user1 = userService.findById(user.getId_user());
        user1.setName(user.getName());
        user1.setLastname(user.getLastname());
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());

        return userService.save(user1);
    }

}
