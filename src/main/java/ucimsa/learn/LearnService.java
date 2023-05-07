package ucimsa.learn;

import jakarta.servlet.http.HttpSession;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.text.TextNotFoundException;
import ucimsa.text.TextService;

@Service
@Transactional
public class LearnService {

  private final TextService textService;
  private final LessonRepo lessonRepo;


  @Autowired
  public LearnService(TextService textService, LessonRepo lessonRepo) {
    this.textService = textService;
    this.lessonRepo = lessonRepo;
  }

  /**
   * Choose sentences to learn in this session, calculate limit from coverage, but at least as many as splits
   */
  public void createLessonSplitSentences(OptionsSplitSentences options, HttpSession httpSession, String username) throws TextNotFoundException {
    final var heapText = textService.getText(options.getTextId(), username, false);
    final var sentences = heapText.getSentences();
    Collections.shuffle(sentences);

    if (options.getCoverage() != 100) {
      final var limit = calculateLimit(sentences.size(), options.getCoverage(), options.getSplits());
      heapText.setSentences(sentences.stream().limit(limit).toList());
    }
    options.setLessonId(lessonRepo.nextLessonId());
    httpSession.setAttribute("lessonSplitSentences", new LessonSplitSentences(options, heapText));
  }

  private int calculateLimit(int numberOfSentences, int coverage, int splits) {
    return Math.max(numberOfSentences * coverage / 100 + 1, splits);
  }

}
