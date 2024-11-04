package com.microservices.auth.dto;


import com.microservices.auth.enums.Role;
import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String username;
    private String password;
    private Role role;
}
