package kz.sabyrzhan.zapper.models;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Blog {
  private int id;
  private String imageUrl;
  private String smallImageUrl;
  private String title;
  private LocalDate date;
  private String text;
  private String shortText;
}
