package com.virtualpairprogrammers.roombooking;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
      .withUser("user").password("{noop}pass").authorities("ROLE_ADMIN");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .csrf().disable()
      .authorizeRequests()
      .antMatchers(HttpMethod.OPTIONS, "/api/basicAuth/**").permitAll()
      .antMatchers("/api/basicAuth/**")
      .hasAnyRole("USER", "ADMIN")
      .and()
      .httpBasic()
      .and()
      .authorizeRequests()
      .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
      .antMatchers(HttpMethod.GET, "/api/bookings/**").permitAll()
      .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole("USER", "ADMIN")
      .antMatchers("/api/**").hasRole("ADMIN")
      .and()
      .addFilter(new JWTAuthorizationFilter(authenticationManager()));
  }
}
