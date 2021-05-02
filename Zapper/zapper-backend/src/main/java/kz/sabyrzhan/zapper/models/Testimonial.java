package kz.sabyrzhan.zapper.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Testimonial {
  private String userAvatarUrl;
  private String userName;
  private String feedback;
}
