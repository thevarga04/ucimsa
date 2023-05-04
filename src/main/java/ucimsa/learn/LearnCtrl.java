package ucimsa.learn;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/learn")
@Slf4j
public class LearnCtrl {


  @GetMapping("/chooseLessonType")
  public String getTextsLearn() {
    return "learn/chooseLessonType";
  }

  @GetMapping("/optionsSplitSentences")
  public String getOptionsSplitSentences() {
    return "learn/optionsSplitSentences";
  }

  @GetMapping("/lessonSplitSentences")
  public String getLessonSplitSentences() {
    return "learn/lessonSplitSentences";
  }


}
