package com.virtualpairprogrammers.roombooking.control;

import com.virtualpairprogrammers.roombooking.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/api/basicAuth")
public class ValidateUserRestController {
  @Autowired
  private JWTService jwtService;

  @GetMapping("/validate")
  public Map<String, Object> isValid(Authentication authentication, HttpServletResponse httpServletResponse) {
    String username;
    if (authentication.getPrincipal() instanceof User) {
      User principal = (User) authentication.getPrincipal();
      username = principal.getUsername();
    } else {
      username = authentication.getPrincipal().toString();
    }

    String role = ((GrantedAuthority)authentication.getAuthorities().toArray()[0]).getAuthority().substring(5);
    String token = jwtService.generateToken(username, role);

    Cookie cookie = new Cookie("token", token);
    cookie.setPath("/api");
    cookie.setHttpOnly(true);
    cookie.setMaxAge(1800);
    httpServletResponse.addCookie(cookie);

    return Map.of("token", token);
  }

  @GetMapping("/logout")
  public Map<String, String> logout(HttpServletResponse response) {
    Cookie cookie = new Cookie("token", "");
    cookie.setPath("/api");
    cookie.setHttpOnly(true);
    cookie.setMaxAge(0);
    response.addCookie(cookie);

    return Map.of("status", "ok");
  }
}
