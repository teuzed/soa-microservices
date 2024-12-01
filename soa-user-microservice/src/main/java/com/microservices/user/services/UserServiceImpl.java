package com.microservices.user.services;

import com.microservices.user.models.User;
import com.microservices.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository repository;

    public UserServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User save(User user) {
        User toSave = User.builder()
                .name(user.getName())
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .build();
        return repository.save(toSave);
    }

    @Override
    public User findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {

        User user = findById(id);
        if(user != null){
            repository.delete(user);
        }

    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }


    @Override
    public User findByUsername(String username) {
        return repository.findByUsername(username);
    }

    private boolean userExists(String username) {
        try {
            User user = findByUsername(username);
            boolean exists = user != null;
            logger.info("User existence check for {}: {}", username, exists);
            return exists;
        } catch (Exception e) {
            logger.error("Error during user existence check for {}: {}", username, e.getMessage());
            return false; // Default to false if an error occurs
        }
    }

}
