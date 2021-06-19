package com.virtualpairprogrammers.roombooking.model;

import com.virtualpairprogrammers.roombooking.model.entities.User;

import java.util.Objects;

public class AngularUser {
  private long id;
  private String name;

  public AngularUser() {

  }

  public AngularUser(User user) {
    Objects.requireNonNull(user);
    id = user.getId();
    name = user.getName();
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public User toUser() {
    User user = new User();
    user.setId(id);
    user.setName(name);
    return user;
  }
}
