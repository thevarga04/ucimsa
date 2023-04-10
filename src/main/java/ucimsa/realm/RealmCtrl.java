package ucimsa.realm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RealmCtrl {

  private final UserValidator userValidator;
  private final UserService userService;


  @Autowired
  public RealmCtrl(UserValidator userValidator, UserService userService) {
    this.userValidator = userValidator;
    this.userService = userService;
  }


  @GetMapping({"/", "/home"})
  public String getHome() {
    return "home";
  }

  @GetMapping("/registration")
  public String registration() {
    return "registration";
  }

  @PostMapping(value = "/registration")
  public String registration(@NonNull User user, HttpServletRequest request, HttpServletResponse response) throws UserValidatorException {
    userValidator.validate(user);
    userService.save(user);
    // autologin ...
    return "redirect:/home";
  }

  @GetMapping("/login")
  public String getLogin() {
    return "login";
  }


}
