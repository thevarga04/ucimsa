package ucimsa.realm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RealmCtrl {

  private final LoginService loginService;


  @Autowired
  public RealmCtrl(LoginService loginService) {
    this.loginService = loginService;
  }


  @GetMapping({"/", "/home"})
  public String home() {
    return "home";
  }

  @GetMapping("/registration")
  public String registration() {
    return "registration";
  }

  @GetMapping("/login")
  public String login() {
    return "login";
  }

  @PostMapping("/logout")
  public String postLogout(HttpServletRequest request, HttpServletResponse response) {
    loginService.logout(request, response);
    return "home";
  }

}
