package ucimsa.common;

import java.util.regex.Pattern;

public abstract class ApplicationConstants {

  private ApplicationConstants() {
  }


  public static final Pattern EMAIL_REGEX_PATTERN = Pattern
      .compile("^[a-zA-Z0-9_~.+-]+@[a-zA-Z0-9.-]+$");


}
