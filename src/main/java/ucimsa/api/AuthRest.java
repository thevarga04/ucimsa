package ucimsa.api;

import static org.springframework.http.HttpStatus.MOVED_PERMANENTLY;

import java.net.URI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ucimsa.realm.SecurityService;
import ucimsa.realm.User;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthRest {

  private final SecurityService securityService;


  @Autowired
  public AuthRest(SecurityService securityService) {
    this.securityService = securityService;
  }


  @GetMapping("/whoami")
  public ResponseEntity<String> getWhoAmI() {
    return ResponseEntity.of(securityService.getCurrentUserLogin());
  }

  @GetMapping("/whoami/test")
  public ResponseEntity<User> getWhoAmITest() {
    return ResponseEntity
        .status(MOVED_PERMANENTLY)
        .location(URI.create("/auth/whoami"))
        .build();
  }


}
