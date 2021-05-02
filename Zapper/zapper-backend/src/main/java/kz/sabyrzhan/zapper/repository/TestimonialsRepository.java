package kz.sabyrzhan.zapper.repository;

import kz.sabyrzhan.zapper.models.Testimonial;
import lombok.SneakyThrows;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Repository
public class TestimonialsRepository {
  public Flux<Testimonial> getTestimonials() {
    Testimonial[]  testimonials = new Testimonial[4];
    testimonials[0] = createTestimonial("/assets/images/testimonial-img-01.png", "Fred Bush", 1);
    testimonials[1] = createTestimonial("/assets/images/testimonial-img-02.png", "Anna Brolin", 2);
    testimonials[2] = createTestimonial("/assets/images/testimonial-img-03.png", "Angela Friedrich", 3);
    testimonials[3] = createTestimonial("/assets/images/testimonial-img-04.png", "Richard Snowden", 4);

    return Flux.just(testimonials);
  }

  private Testimonial createTestimonial(String avaUrl, String username, int number) {
    Testimonial testimonial = Testimonial.builder()
      .userAvatarUrl(avaUrl)
      .userName(username)
      .feedback(readResource(number))
      .build();

    return testimonial;
  }

  @SneakyThrows
  private String readResource(int number) {
    int choose = number % 4 + 1;
    String result;
    String resourceName = "feedbacks/text" + choose + ".txt";
    try(InputStream is = getClass().getClassLoader().getResourceAsStream(resourceName)) {
      result = IOUtils.toString(is, StandardCharsets.UTF_8);
    }

    return result;
  }
}
