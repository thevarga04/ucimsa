package ucimsa.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ucimsa.realm.UserValidatorException;

@ControllerAdvice
@Slf4j
public class GlobalControllerExceptionHandler {

  @ExceptionHandler({
      UserValidatorException.class
      , UsernameNotFoundException.class
  })
  public ResponseEntity<String> userValidatorException(UserValidatorException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }


}
