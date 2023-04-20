package ucimsa.realm;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class RealmCtrl {


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


}
