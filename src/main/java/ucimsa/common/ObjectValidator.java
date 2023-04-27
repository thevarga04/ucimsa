package ucimsa.common;

import static org.springframework.util.ObjectUtils.isEmpty;

import org.springframework.stereotype.Component;
import ucimsa.realm.JpaUser;
import ucimsa.realm.UserRegistrationException;

@Component
public class ObjectValidator {


  public void validateExists(JpaUser jpaUser, String username) throws UserRegistrationException {
    if (isEmpty(jpaUser)) {
      throw new UserRegistrationException("%s does not exists.".formatted(username));
    }
  }


}
