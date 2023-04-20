package ucimsa.api.whoami;

import static org.springframework.http.HttpStatus.MOVED_PERMANENTLY;

import java.net.URI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ucimsa.realm.LoginService;
import ucimsa.realm.User;

@RestController
@RequestMapping("/api/whoami")
@Slf4j
public class WhoamiRest {

  private final LoginService loginService;


  @Autowired
  public WhoamiRest(LoginService loginService) {
    this.loginService = loginService;
  }


  @GetMapping()
  public ResponseEntity<String> getWhoAmI() {
    return ResponseEntity.of(loginService.getCurrentUserLogin());
  }

  @GetMapping("/test")
  public ResponseEntity<User> getWhoAmITest() {
    return ResponseEntity
        .status(MOVED_PERMANENTLY)
        .location(URI.create("/api/whoami"))
        .build();
  }


}
