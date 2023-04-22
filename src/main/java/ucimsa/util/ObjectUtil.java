package ucimsa.util;

import static org.springframework.util.ObjectUtils.isEmpty;

import ucimsa.realm.JpaUser;
import ucimsa.realm.UserValidatorException;

public class ObjectUtil {

  private ObjectUtil() {
  }

  public static void validateExists(JpaUser jpaUser, String username) throws UserValidatorException {
    if (isEmpty(jpaUser)) {
      throw new UserValidatorException("%s does not exists.".formatted(username));
    }
  }


}
