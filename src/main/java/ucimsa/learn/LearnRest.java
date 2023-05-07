package ucimsa.learn;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ucimsa.text.TextNotFoundException;

@RestController
@RequestMapping("/api/learn")
@Slf4j
public class LearnRest {

  private final LearnService learnService;


  @Autowired
  public LearnRest(LearnService learnService) {
    this.learnService = learnService;
  }


  /**
   * To start a learning session, first need to get and validate the textId and the lesson type options.
   * 1. Validate input
   * 2. Generate unique lessonId
   * 3. Store the lessonId, LessonType and Options in the httpSession
   *
   * @return lessonId
   */
  @PostMapping("/options/splitSentences")
  public ResponseEntity<HttpStatus> postLearn(
      @Valid OptionsSplitSentences options
      , HttpSession httpSession
      , Principal principal
  ) throws TextNotFoundException {
    learnService.createLessonSplitSentences(options, httpSession, principal.getName());
    return ResponseEntity.ok().build();
  }

  @GetMapping("/inquiry/splitSentences")
  public ResponseEntity<LessonSplitSentences> getInquirySplitSentences(HttpSession httpSession) {
    var lessonSplitSentences = (LessonSplitSentences) httpSession.getAttribute("lessonSplitSentences");
    return ResponseEntity.ok(lessonSplitSentences);
  }


}
