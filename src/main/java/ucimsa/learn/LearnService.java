package ucimsa.learn;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.common.math.Abacus;
import ucimsa.text.TextNotFoundException;
import ucimsa.text.TextService;

import java.util.Collections;

import static ucimsa.common.ApplicationConstants.THOUSAND;

@Service
@Transactional
public class LearnService {

  private final TextService textService;
  private final Abacus abacus;
  private final LessonRepo lessonRepo;
  private final OptionsService optionsService;


  @Autowired
  public LearnService(TextService textService, Abacus abacus, LessonRepo lessonRepo, OptionsService optionsService) {
    this.textService = textService;
    this.abacus = abacus;
    this.lessonRepo = lessonRepo;
    this.optionsService = optionsService;
  }


  /**
   * Create new lesson containing sentences to learn from given options in this session
   */
  public void createLessonSplitSentences(OptionsSplitSentences options, HttpSession httpSession, String username) throws TextNotFoundException {
    final var text = textService.getText(options.getTextId(), username);
    options.setLessonId(lessonRepo.nextLessonId());

    final var sentences = text.getSentences();
    Collections.shuffle(sentences);
    if (options.getCoverage() < THOUSAND) {
      final var ratio = (float) options.getCoverage() / THOUSAND;
      final var limit = abacus.atLeastMinUpToMaxByRatio(options.getSplits(), sentences.size(), ratio);
      text.setSentences(sentences.stream().limit(limit).toList());
    }
    optionsService.save(options, username);

    final var lessonSplitSentences = new LessonSplitSentences(options, text);
    httpSession.setAttribute("lessonSplitSentences", lessonSplitSentences);
  }


}
