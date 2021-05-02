package kz.sabyrzhan.zapper.endpoints;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestEndpoint {
  @GetMapping
  public Mono<Map<String, Object>> test() {
    return Mono.just(Map.of("some", "value"));
  }
}
