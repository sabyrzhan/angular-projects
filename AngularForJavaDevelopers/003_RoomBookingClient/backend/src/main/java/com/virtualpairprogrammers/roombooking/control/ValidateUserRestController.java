package com.virtualpairprogrammers.roombooking.control;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/basicAuth")
public class ValidateUserRestController {
  @GetMapping("/validate")
  public Map<String, Object> isValid() {
    return Map.of("result", "ok");
  }
}
