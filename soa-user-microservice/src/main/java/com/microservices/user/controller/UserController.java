package com.microservices.user.controller;

import com.microservices.user.models.User;
import com.microservices.user.services.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> save(@RequestBody User user){
        User savedUser = userService.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("username", savedUser.getUsername());
        response.put("name", savedUser.getName());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public User findById(@PathVariable Long id){
        return userService.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        userService.deleteById(id);
    }

    @PostMapping("/update")
    public User update(User user){

        User user1 = userService.findById(user.getId_user());
        user1.setName(user.getName());
        user1.setUsername(user.getUsername());
        user1.setPassword(user.getPassword());
        return userService.save(user1);
    }


    @GetMapping("/getUserByUsername/{username}")
    public User getUserByUsername(@PathVariable String username){
        logger.info("Getting user by username: {}", username);
        return userService.findByUsername(username);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user){
        User user1 = userService.findByUsername(user.getUsername());
        Map<String, String> response = new HashMap<>();
        if(user1 != null){
            response.put("message", "Login successful");
            response.put("id", user1.getId_user().toString());
            response.put("username", user1.getUsername());
            response.put("name", user1.getName());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("message", "Invalid credentials");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/example")
    public String example(){
        return "Hello world";
    }
}
