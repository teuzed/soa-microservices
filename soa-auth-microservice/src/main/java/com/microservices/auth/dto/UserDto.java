package com.microservices.auth.dto;


import com.microservices.auth.enums.Role;
import lombok.Data;

@Data
public class UserDto {
    private String name;
    private String lastName;
    private String email;
    private Role role;
    private String username;
    private String password;
}
