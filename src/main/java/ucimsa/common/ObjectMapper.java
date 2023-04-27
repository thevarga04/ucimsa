package ucimsa.common;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.stereotype.Component;

@Component
public class ObjectMapper {


  public <T> Stream<T> ofNullable(Collection<T> collection) {
    return Optional.ofNullable(collection).stream().flatMap(Collection::stream);
  }

}
