package ucimsa.text;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/texts")
@Slf4j
public class TextCtrl {

  private final HttpSession httpSession;


  @Autowired
  public TextCtrl(HttpSession httpSession) {
    this.httpSession = httpSession;
  }


  @GetMapping
  public String texts() {
    return "texts";
  }


  @GetMapping("/heap")
  public String heapText() {
    return "text/heap";
  }

}
