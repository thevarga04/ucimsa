package ucimsa.stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ucimsa.common.DateTimeFacade;

@Component
public class StatsMapper {

  private final DateTimeFacade dateTimeFacade;


  @Autowired
  public StatsMapper(DateTimeFacade dateTimeFacade) {
    this.dateTimeFacade = dateTimeFacade;
  }


  public JpaStatsSplitSentences toJpaHit(StatsSplitSentences statsSplitSentences, int userId) {
    return JpaStatsSplitSentences.builder()
        .id(statsSplitSentences.getId())
        .userId(userId)
        .textId(statsSplitSentences.getTextId())
        .lessonId(statsSplitSentences.getLessonId())
        .sentenceId(statsSplitSentences.getSentenceId())
        .goodPick(statsSplitSentences.isGoodPick())
        .timestamp(dateTimeFacade.getCurrentTimestamp())
        .build();
  }


}
