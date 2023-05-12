package ucimsa.learn;

import jakarta.servlet.http.HttpSession;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.realm.UserService;
import ucimsa.text.TextNotFoundException;
import ucimsa.text.TextService;

@Service
@Transactional
public class LearnService {

  private final TextService textService;
  private final LessonRepo lessonRepo;
  private final UserService userService;
  private final OptionsMapper optionsMapper;
  private final OptionsRepo optionsRepo;


  @Autowired
  public LearnService(TextService textService, LessonRepo lessonRepo, UserService userService, OptionsMapper optionsMapper, OptionsRepo optionsRepo) {
    this.textService = textService;
    this.lessonRepo = lessonRepo;
    this.userService = userService;
    this.optionsMapper = optionsMapper;
    this.optionsRepo = optionsRepo;
  }

  /**
   * Choose sentences to learn in this session, calculate limit from coverage, but at least as many as splits
   */
  public void createLessonSplitSentences(OptionsSplitSentences options, HttpSession httpSession, String username) throws TextNotFoundException {
    final var heapText = textService.getText(options.getTextId(), username, false);
    final var sentences = heapText.getSentences();
    Collections.shuffle(sentences);

    if (options.getCoverage() != 100) {
      final var limit = calculateLimit(options.getSplits(), sentences.size(), options.getCoverage());
      heapText.setSentences(sentences.stream().limit(limit).toList());
    }
    options.setLessonId(lessonRepo.nextLessonId());
    final var lessonSplitSentences = new LessonSplitSentences(options, heapText);
    httpSession.setAttribute("lessonSplitSentences", lessonSplitSentences);

    final var jpaUser = userService.getByUsername(username);
    final var jpaOptions = optionsMapper.toJpa(options, jpaUser.getId());
    optionsRepo.save(jpaOptions);
  }

  int calculateLimit(int splits, int numberOfSentences, int coverage) {
    return Math.max(splits, numberOfSentences * coverage / 100);
  }

}
