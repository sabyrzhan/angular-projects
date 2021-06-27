package com.virtualpairprogrammers.roombooking.control;

import com.virtualpairprogrammers.roombooking.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/basicAuth")
public class ValidateUserRestController {
  @Autowired
  private JWTService jwtService;

  @GetMapping("/validate")
  public Map<String, Object> isValid(Authentication authentication) {
    User principal = (User) authentication.getPrincipal();
    String username = principal.getUsername();
    String role = principal.getAuthorities().toArray()[0].toString().substring(5);
    String token = jwtService.generateToken(username, role);
    return Map.of("token", token);
  }
}
