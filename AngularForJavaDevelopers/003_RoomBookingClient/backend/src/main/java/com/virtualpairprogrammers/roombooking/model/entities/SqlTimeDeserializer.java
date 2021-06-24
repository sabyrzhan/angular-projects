package com.virtualpairprogrammers.roombooking.model.entities;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.sql.Time;
import java.time.LocalTime;

public class SqlTimeDeserializer extends JsonDeserializer<Time> {
  @Override
  public Time deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
    Time time = Time.valueOf(LocalTime.parse(jsonParser.getText()));
    return time;
  }
}
