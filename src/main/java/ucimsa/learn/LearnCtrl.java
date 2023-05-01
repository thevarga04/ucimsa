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

  /**
   * @return A brand-new learning session based on given textId and lessonType and its options
   */
  @GetMapping()
  public String getLearn() {
    return "learn/splitSentencesSession";
  }



  @GetMapping("/splitSentencesOptions")
  public String getSplitSentencesOptions() {
    return "learn/splitSentencesOptions";
  }

  @GetMapping("/splitSentencesSession")
  public String getSplitSentencesSession() {
    return "learn/splitSentencesSession";
  }


}
