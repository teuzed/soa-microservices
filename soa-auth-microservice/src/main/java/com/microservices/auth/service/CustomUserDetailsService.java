package com.microservices.auth.service;

import com.microservices.auth.client.UserServiceClient;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {

    private final UserServiceClient userServiceClient;

    public CustomUserDetailsService(UserServiceClient userServiceClient) {
        this.userServiceClient = userServiceClient;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userServiceClient.getUserByUsername(username).getBody();
        assert user != null;
        return new CustomUserDetails(user);
    }
}
