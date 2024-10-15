package com.microservices.user.services;

import com.microservices.user.models.User;

public interface UserService {

    User save(User user);

    public User findById(Long id);

    public void deleteById(Long id);


}
