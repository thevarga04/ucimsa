package ucimsa.realm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RealmCtrl {

  private final UserValidator userValidator;
  private final UserService userService;
  private final SecurityService securityService;
  private final AuthenticationManager authenticationManager;
  private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();


  @Autowired
  public RealmCtrl(UserValidator userValidator, UserService userService, SecurityService securityService, AuthenticationManager authenticationManager) {
    this.userValidator = userValidator;
    this.userService = userService;
    this.securityService = securityService;
    this.authenticationManager = authenticationManager;
  }


  @GetMapping({"/", "/home"})
  public String getHome() {
    return "home";
  }

  @GetMapping("/registration")
  public String getRegistration() {
    return "registration";
  }

  @PostMapping(value = "/registration")
  public String postRegistration(@NonNull User user, HttpServletRequest request, HttpServletResponse response
  ) throws UserValidatorException {
    userValidator.validate(user);
    userService.save(user);
    securityService.login(user, request, response, authenticationManager, securityContextRepository);
    return "home";
  }

  @GetMapping("/login")
  public String getLogin() {
    return "login";
  }


}
