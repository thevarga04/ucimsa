package ucimsa.text;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/texts")
public class TextCtrl {


  @GetMapping
  public String getTexts() {
    return "texts";
  }

  @GetMapping("/heapText")
  public String getTextsHeap() {
    return "text/heapText";
  }


}
