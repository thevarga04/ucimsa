package ucimsa.common;

import java.time.Instant;
import org.springframework.stereotype.Component;

@Component
public class DateTimeFacade {


  public long getCurrentTimestamp() {
    return Instant.now().getEpochSecond();
  }


}
