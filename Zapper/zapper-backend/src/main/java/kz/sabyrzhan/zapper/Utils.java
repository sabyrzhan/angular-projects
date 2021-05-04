package kz.sabyrzhan.zapper;

import lombok.SneakyThrows;
import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class Utils {
  @SneakyThrows
  public static String readResource(String resourceName) {
    String result;
    try(InputStream is = Utils.class.getClassLoader().getResourceAsStream(resourceName)) {
      result = IOUtils.toString(is, StandardCharsets.UTF_8);
    }

    return result;
  }
}
