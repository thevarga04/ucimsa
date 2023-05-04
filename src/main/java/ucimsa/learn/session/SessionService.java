package ucimsa.learn.session;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import ucimsa.learn.LearningOptions;
import ucimsa.learn.LessonType;

@Component
public class SessionService {


  public void storeParameters(HttpSession httpSession, long sessionId, LessonType lessonType, LearningOptions options) {
    httpSession.setAttribute("sessionId", sessionId);
    httpSession.setAttribute("lessonType", lessonType);
    httpSession.setAttribute("lessonOptions", options);
  }


}
