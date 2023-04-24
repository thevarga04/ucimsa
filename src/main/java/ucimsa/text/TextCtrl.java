package ucimsa.text;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/texts")
@Slf4j
public class TextCtrl {


  @GetMapping
  public String texts() {
    return "texts";
  }

  @GetMapping("/heap")
  public String heapText() {
    return "text/heap";
  }


}
