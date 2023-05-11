package ucimsa.learn;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/learn")
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
