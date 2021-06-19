package com.virtualpairprogrammers.roombooking.rest;

import com.virtualpairprogrammers.roombooking.data.UserRepository;
import com.virtualpairprogrammers.roombooking.model.AngularUser;
import com.virtualpairprogrammers.roombooking.model.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class RestUsersController {
  @Autowired
  private UserRepository userRepository;

  @GetMapping
  public List<AngularUser> getUsers() {
    return userRepository.findAll().parallelStream().map(u -> new AngularUser(u)).collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public AngularUser getById(@PathVariable long id) {
    return userRepository.findById(id).map(u -> new AngularUser(u)).orElseThrow(() -> new IllegalArgumentException("User with id=" + id + " not found"));
  }

  @PostMapping
  public AngularUser addUser(@RequestBody User user) {
    User savedUser = userRepository.save(user);
    return new AngularUser(savedUser);
  }

  @PutMapping
  public AngularUser updateUser(@RequestBody User user) {
    return userRepository.findById(user.getId()).map(existing -> {
      existing.setName(user.getName());
      userRepository.save(existing);
      return new AngularUser(existing);
    }).orElseThrow(() -> new IllegalArgumentException("User with ID=" + user.getId() + " not found"));
  }
}
