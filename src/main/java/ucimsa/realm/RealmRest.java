package ucimsa.realm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pub")
@Slf4j
public class RealmRest {

  private final UserValidator userValidator;
  private final UserService userService;
  private final LoginService loginService;


  @Autowired
  public RealmRest(UserValidator userValidator, UserService userService, LoginService loginService) {
    this.userValidator = userValidator;
    this.userService = userService;
    this.loginService = loginService;
  }


  @PostMapping(value = "/registration")
  public ResponseEntity<HttpStatus> postRegistration(User user, HttpServletRequest request, HttpServletResponse response
  ) throws UserValidatorException {
    userValidator.validateUnique(user);
    userService.save(user);
    loginService.login(user, request, response);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/login")
  public ResponseEntity<HttpStatus> postLogin(User user, HttpServletRequest request, HttpServletResponse response) {
    loginService.login(user, request, response);
    return ResponseEntity.ok().build();
  }


}
