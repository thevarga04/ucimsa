package ucimsa.learn;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ucimsa.text.TextNotFoundException;

@RestController
@RequestMapping("/api/learn")
public class LearnRest {

  private final LearnService learnService;


  @Autowired
  public LearnRest(LearnService learnService) {
    this.learnService = learnService;
  }


  /**
   * Before starting a learning session:
   * 1. Validate input (textId and lesson type options)
   * 2. Generate unique lessonId
   * 3. Store the lessonId, LessonType and Options in the httpSession
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

  @DeleteMapping("/inquiry/splitSentences")
  public ResponseEntity<HttpStatus> deleteLessonSplitSentences(
      HttpSession httpSession
  ) {
    httpSession.removeAttribute("lessonSplitSentences");
    return ResponseEntity.ok().build();
  }


}
