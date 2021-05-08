package kz.sabyrzhan.zapper.endpoints;

import kz.sabyrzhan.zapper.models.Blog;
import kz.sabyrzhan.zapper.repository.BlogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/blogs")
public class BlogsController {
  @Autowired
  private BlogsRepository blogsRepository;

  @GetMapping
  public Flux<Blog> getBlogs() {
    return blogsRepository.getBlogs();
  }

  @GetMapping("/{id}")
  public Mono<Blog> getBlog(@PathVariable int id) {
    return blogsRepository.getBlog(id);
  }
}
