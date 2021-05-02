package kz.sabyrzhan.zapper.endpoints;

import kz.sabyrzhan.zapper.models.Testimonial;
import kz.sabyrzhan.zapper.repository.TestimonialsRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialsController {
  @Autowired
  private TestimonialsRepository testimonialsRepository;

  @GetMapping
  @SneakyThrows
  public Flux<Testimonial> getTestimonials() {
    return testimonialsRepository.getTestimonials();
  }
}
