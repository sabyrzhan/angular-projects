package com.virtualpairprogrammers.roombooking;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class JwtSecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .csrf().disable()
      .antMatcher("/api/**").httpBasic().disable()
      .authorizeRequests()
        .antMatchers(HttpMethod.GET, "/api/bookings/**").permitAll()
        .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
        .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole("USER", "ADMIN")
        .antMatchers("/api/**").hasRole("ADMIN")
        .antMatchers("/api/**").authenticated()
      .and()
        .addFilter(new JWTAuthorizationFilter(authenticationManager()));
  }
}
