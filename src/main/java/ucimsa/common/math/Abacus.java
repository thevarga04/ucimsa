package ucimsa.common.math;

import org.springframework.stereotype.Component;

@Component
public class Abacus {


  public int atLeastMinUpToMaxByRatio(int min, int max, float ratio) {
    final var value = Math.round(max * ratio);
    return Math.max(min, value);
  }

}
