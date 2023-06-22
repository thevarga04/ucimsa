package ucimsa.realm;

import static org.springframework.util.ObjectUtils.isEmpty;
import static ucimsa.common.ApplicationConstants.EMAIL_REGEX_PATTERN;

import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationValidator {


  public void validateUnique(UserService userService, User user) throws UserRegistrationException {
    if (user == null) {
      throw new UserRegistrationException("Provided null user.");
    }

    for (final var field : List.of(
        user.getFirstname()
        , user.getLastname()
        , user.getUsername()
        , user.getPassword()
    )) {
      if (user.getId() != 0) {
        throw new UserRegistrationException("Provided User ID cannot be tampered.");
      }

      if (isEmpty(field) || field.strip().length() == 0) {
        throw new UserRegistrationException("%s cannot be null or empty.".formatted(field));
      }

      if (!EMAIL_REGEX_PATTERN.matcher(user.getUsername()).matches()) {
        throw new UserRegistrationException("Provided email (username) is not a valid email.");
      }

      if (userService.findByUsername(user.getUsername()) != null) {
        throw new UserRegistrationException("Provided email (username) already exists.");
      }

    }
  }


}
