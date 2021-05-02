package kz.sabyrzhan.zapper.endpoints;

import kz.sabyrzhan.zapper.models.Faq;
import kz.sabyrzhan.zapper.repository.FaqsRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/faqs")
public class FaqsController {
  @Autowired
  private FaqsRepository faqsRepository;

  @GetMapping
  @SneakyThrows
  public Flux<Faq> getFaqs() {
    return faqsRepository.getFaqs();
  }
}
