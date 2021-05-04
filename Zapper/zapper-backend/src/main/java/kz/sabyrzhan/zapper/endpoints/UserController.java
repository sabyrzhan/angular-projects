package kz.sabyrzhan.zapper.endpoints;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @PostMapping("/subscribe")
  public Mono<Void> subscribe(@RequestParam String email) {
    return Mono.empty();
  }
}
