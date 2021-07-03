package com.virtualpairprogrammers.roombooking;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
  private static final Logger LOGGER = LoggerFactory.getLogger(JWTAuthorizationFilter.class);
  private JWTService jwtService;

  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
    super(authenticationManager);
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain chain) throws IOException, ServletException {
    Cookie[] cookies = request.getCookies();
    if (cookies == null || cookies.length == 0) {
      chain.doFilter(request, response);
      return;
    }

    Cookie tokenCookie = Arrays.stream(cookies)
                          .filter(cookie ->  "token".equals(cookie.getName()))
                          .findFirst().orElse(null);

    if (tokenCookie == null) {
      chain.doFilter(request, response);
      return;
    }

    if (jwtService == null) {
      ServletContext context = request.getServletContext();
      WebApplicationContext appContext = WebApplicationContextUtils.getWebApplicationContext(context);
      jwtService = appContext.getBean(JWTService.class);
    }

    UsernamePasswordAuthenticationToken auth = getAuthentication(tokenCookie.getValue());
    SecurityContextHolder.getContext().setAuthentication(auth);
    chain.doFilter(request, response);
  }

  private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken) {
    try {
      String payload = jwtService.validateToken(jwtToken);
      Map<String, Object> value = OBJECT_MAPPER.readValue(payload, Map.class);
      String user = value.get("user").toString();
      String role = value.get("role").toString();
      List<GrantedAuthority> roles = new ArrayList<>();
      roles.add(() -> "ROLE_" + role);
      User tokenUser = new User(user, "", roles);
      UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(tokenUser, null, roles);
      return token;
    } catch (Exception e) {
      LOGGER.error("Error", e);
      return null;
    }
  }
}
