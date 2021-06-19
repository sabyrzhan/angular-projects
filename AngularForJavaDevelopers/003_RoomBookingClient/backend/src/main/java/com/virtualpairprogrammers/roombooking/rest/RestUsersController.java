package com.virtualpairprogrammers.roombooking.rest;

import com.virtualpairprogrammers.roombooking.data.UserRepository;
import com.virtualpairprogrammers.roombooking.model.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class RestUsersController {
  @Autowired
  private UserRepository userRepository;

  @GetMapping
  public List<User> getUsers() {
    return userRepository.findAll();
  }

  @GetMapping("/{id}")
  public User getById(@PathVariable long id) {
    return userRepository.findById(id).get();
  }

  @PostMapping
  public User addUser(@RequestBody User user) {
    return userRepository.save(user);
  }

  @PutMapping
  public User updateUser(@RequestBody User user) {
    return userRepository.save(user);
  }
}
