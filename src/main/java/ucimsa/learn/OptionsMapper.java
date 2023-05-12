package ucimsa.learn;

import org.springframework.stereotype.Component;

@Component
public class OptionsMapper {

  JpaOptionsSplitSentences toJpa(OptionsSplitSentences options, int userId) {
    return JpaOptionsSplitSentences.builder()
        .id(options.getLessonId())
        .userId(userId)
        .textId(options.getTextId())
        .coverage(options.getCoverage())
        .splits(options.getSplits())
        .matching(options.getMatching())
        .sections(options.getSections())
        .build();
  }

}
