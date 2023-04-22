package ucimsa.realm;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.util.List;
import java.util.regex.Pattern;
import org.springframework.stereotype.Component;

@Component
public class UserValidator {

  private static final Pattern EMAIL_REGEX_PATTERN = Pattern
      .compile("^[a-zA-Z0-9_~.+-]+@[a-zA-Z0-9.-]+$");

  private final UserService userService;


  public UserValidator(UserService userService) {
    this.userService = userService;
  }

  public void validateUnique(User user) throws UserValidatorException {
    if (user == null) {
      throw new UserValidatorException("Provided null user.");
    }

    for (final var field : List.of(
        user.getFirstname()
        , user.getLastname()
        , user.getUsername()
        , user.getPassword()
    )) {
      if (user.getId() != 0) {
        throw new UserValidatorException("Provided User ID cannot be tampered.");
      }

      if (isEmpty(field) || field.strip().length() == 0) {
        throw new UserValidatorException("%s cannot be null or empty.".formatted(field));
      }

      if (!EMAIL_REGEX_PATTERN.matcher(user.getUsername()).matches()) {
        throw new UserValidatorException("Provided email (username) is not a valid email.");
      }

      if (userService.findByUsername(user.getUsername()) != null) {
        throw new UserValidatorException("Provided email (username) already exists.");
      }

    }
  }


}
