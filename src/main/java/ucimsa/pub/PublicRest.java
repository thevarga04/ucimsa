package ucimsa.pub;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pub")
public class PublicRest {


  @GetMapping("/public")
  public ResponseEntity<String> getPublic() {
    return ResponseEntity.ok("OK, this is public space.");
  }


}
