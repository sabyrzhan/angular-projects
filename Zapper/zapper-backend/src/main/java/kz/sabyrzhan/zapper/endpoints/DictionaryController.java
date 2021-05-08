package kz.sabyrzhan.zapper.endpoints;

import kz.sabyrzhan.zapper.models.Category;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/dictionary")
public class DictionaryController {
  @GetMapping("/categories")
  public Flux<Category> getCategories() {
    Category[] result = new Category[] {
      new Category(1, "Technology"),
      new Category(2, "Application"),
      new Category(3, "Updates"),
      new Category(4, "Help articles")
    };

    return Flux.just(result);
  }
}
