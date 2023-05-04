package ucimsa.learn;

import static ucimsa.learn.LessonType.SPLIT_SENTENCES;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ucimsa.learn.session.SessionRepo;
import ucimsa.learn.session.SessionService;
import ucimsa.realm.UserRegistrationException;
import ucimsa.text.TextValidator;

@RestController
@RequestMapping("/api/learn")
@Slf4j
public class LearnRest {

  private final TextValidator textValidator;
  private final SessionRepo sessionRepo;
  private final SessionService sessionService;


  @Autowired
  public LearnRest(TextValidator textValidator, SessionRepo sessionRepo, SessionService sessionService) {
    this.textValidator = textValidator;
    this.sessionRepo = sessionRepo;
    this.sessionService = sessionService;
  }


  /**
   * To start a learning session, first need to get and validate the textId and the lesson type options.
   * 1. Validate input
   * 2. Generate unique learningSessionId
   * 3. Store the SessionId, LessonType and Options in the httpSession
   *
   * @return sessionId
   */
  @PostMapping("/options/splitSentences")
  public ResponseEntity<Long> postLearn(
      @RequestParam(name = "textId") int textId
      , @Valid SplitSentencesOptions options
      , Principal principal
      , HttpSession httpSession
  ) throws UserRegistrationException {
    textValidator.validateIfExistsAndIsAccessible(textId, principal.getName());
    final var sessionId = sessionRepo.getNextSessionId();
    sessionService.storeParameters(httpSession, sessionId, SPLIT_SENTENCES, options);
    return ResponseEntity.ok(sessionId);
  }


  // Redirect to LearnCtrl.getLearn() which inject HttpSession, validate learningSessionId
  // and return specific LearningSession.jsp based on httpSession.lessonType

  // Then splitSentencesSession.js (or other LearningSession type)
  // will generate the LS UI and as the 1st inquiry
  // as well as all the subsequent queries:
  // POST /api/learn/inquiry?sessionId=xyz (returning next Inquiry or NO_CONTENT if done)

}
