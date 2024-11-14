package com.microservices.auth.service;

import com.microservices.auth.client.UserServiceClient;
import com.microservices.auth.dto.RegisterDto;
import com.microservices.auth.dto.TokenDto;
import com.microservices.auth.exceptions.WrongCredentialsException;
import com.microservices.auth.request.LoginRequest;
import com.microservices.auth.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserServiceClient userServiceClient;
    private final JwtService jwtService;

    public TokenDto login(LoginRequest request) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        if (authenticate.isAuthenticated())
            return TokenDto
                    .builder()
                    .token(jwtService.generateToken(request.getEmail()))
                    .build();
        else throw new WrongCredentialsException("Wrong credentials");
    }


    public RegisterDto save(RegisterRequest request) {
        return userServiceClient.save(request).getBody();
    }

}
