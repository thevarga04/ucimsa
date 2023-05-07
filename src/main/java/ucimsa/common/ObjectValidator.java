package ucimsa.common;

import static org.springframework.util.ObjectUtils.isEmpty;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ucimsa.realm.JpaUser;

@Component
public class ObjectValidator {


  public void validateExists(JpaUser jpaUser, String username) {
    if (isEmpty(jpaUser)) {
      throw new UsernameNotFoundException("%s does not exists.".formatted(username));
    }
  }


}
