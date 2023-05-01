package ucimsa.learn;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/learn")
@Slf4j
public class LearnRest {


  /**
   * To start a new learning session, need to get and process the textId and lessonType with options
   *
   * @return sessionId and lessonType (either LessonSplitSentences, LessonFindMistake, LessonAssemblySentence, LessonFillBlanks)
   */
  @PostMapping
  public ResponseEntity<Integer> postLearn() {
    final var sessionId = 1;
    return ResponseEntity.ok(sessionId);
  }
}
