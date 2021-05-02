package kz.sabyrzhan.zapper.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import kz.sabyrzhan.zapper.models.Faq;
import lombok.SneakyThrows;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Repository
public class FaqsRepository {
  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
  @SneakyThrows
  public Flux<Faq> getFaqs() {
    String result;
    try(InputStream is = getClass().getClassLoader().getResourceAsStream("faq.json")) {
      result = IOUtils.toString(is, StandardCharsets.UTF_8);
    }

    Faq[] faqs = OBJECT_MAPPER.readValue(result, Faq[].class);

    return Flux.just(faqs);
  }
}
