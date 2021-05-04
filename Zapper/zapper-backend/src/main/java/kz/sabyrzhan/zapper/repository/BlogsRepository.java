package kz.sabyrzhan.zapper.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import kz.sabyrzhan.zapper.Utils;
import kz.sabyrzhan.zapper.models.Blog;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;

@Repository
public class BlogsRepository {
  @Autowired
  private ObjectMapper objectMapper;

  @SneakyThrows
  public Flux<Blog> getBlogs() {
    String json = Utils.readResource("blogs/blogs.json");
    String text = Utils.readResource("blogs/blogText.html");
    Blog[] blogs = objectMapper.readValue(json, Blog[].class);
    int i = 1;
    for(Blog blog: blogs) {
      blog.setId(i++);
      blog.setDate(LocalDate.now());
      blog.setText(text);
    }

    return Flux.just(blogs);
  }

  public Mono<Blog> getBlog(int id) {
    return getBlogs().collectList().map(items -> items.get(0));
  }
}
