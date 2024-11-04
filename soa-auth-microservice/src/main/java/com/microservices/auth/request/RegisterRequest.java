package com.microservices.auth.request;

import lombok.Getter;

@Getter
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
}
