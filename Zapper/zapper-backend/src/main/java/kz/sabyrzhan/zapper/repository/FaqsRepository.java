package kz.sabyrzhan.zapper.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import kz.sabyrzhan.zapper.Utils;
import kz.sabyrzhan.zapper.models.Faq;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public class FaqsRepository {
  @Autowired
  private ObjectMapper objectMapper;

  @SneakyThrows
  public Flux<Faq> getFaqs() {
    String result = Utils.readResource("faq.json");
    Faq[] faqs = objectMapper.readValue(result, Faq[].class);

    return Flux.just(faqs);
  }
}
