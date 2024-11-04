package com.microservices.user.services;

import com.microservices.user.models.User;
import com.microservices.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{


    @Autowired
    private UserRepository repository;

    @Override
    public User save(User user) {
        return repository.save(user);
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
    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
