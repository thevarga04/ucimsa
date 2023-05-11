package ucimsa.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ucimsa.realm.UserRegistrationException;
import ucimsa.text.TextNotFoundException;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

  @ExceptionHandler(UserRegistrationException.class)
  public ResponseEntity<String> userValidatorException(UserRegistrationException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }

  @ExceptionHandler(TextNotFoundException.class)
  public ResponseEntity<String> textNotFoundException(TextNotFoundException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<String> authenticationException() {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password.");
  }


}
