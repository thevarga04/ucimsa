package ucimsa.lesson;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/lessons")
@Slf4j
public class LessonCtrl {


  @GetMapping("/splitSentences")
  public String getLessonSplitSentences() {
    return "lesson/splitSentences";
  }

}
