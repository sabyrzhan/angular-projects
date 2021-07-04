package com.virtualpairprogrammers.roombooking;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@Order(1)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
      .withUser("user").password("{noop}pass").authorities("ROLE_ADMIN")
      .and()
      .withUser("user2").password("{noop}pass").authorities("ROLE_USER");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .csrf().disable()
      .antMatcher("/api/basicAuth/**").httpBasic().disable()
      .authorizeRequests()
        .antMatchers(HttpMethod.GET, "/api/basicAuth/logout").permitAll()
        .antMatchers(HttpMethod.OPTIONS, "/api/basicAuth/**").permitAll()
        .antMatchers("/api/basicAuth/**").authenticated().and().httpBasic()
      .and()
        .authorizeRequests()
        .antMatchers("/api/basicAuth/**").hasAnyRole("USER", "ADMIN");
  }
}
