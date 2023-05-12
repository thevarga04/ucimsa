package ucimsa.stats;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ucimsa.common.DateTimeFacade;
import ucimsa.learn.JpaOptionsSplitSentences;
import ucimsa.learn.OptionsSplitSentences;
import ucimsa.text.HeapText;

@Component
public class StatsMapper {

  private final DateTimeFacade dateTimeFacade;


  @Autowired
  public StatsMapper(DateTimeFacade dateTimeFacade) {
    this.dateTimeFacade = dateTimeFacade;
  }


  public JpaHitSplitSentences toJpa(HitSplitSentences hit, int userId) {
    return JpaHitSplitSentences.builder()
        .userId(userId)
        .textId(hit.getTextId())
        .lessonId(hit.getLessonId())
        .sentenceId(hit.getSentenceId())
        .goodPick(hit.isGoodPick())
        .timestamp(hit.getTimestamp())
        .build();
  }


  public StatsSplitSentences toStatsList(
      HeapText heapText
      , JpaOptionsSplitSentences jpaOptions
      , List<JpaHitSplitSentences> jpaHits
  ) {
    return StatsSplitSentences.builder()
        .heapText(heapText)
        .options(OptionsSplitSentences.builder()
            .coverage(jpaOptions.getCoverage())
            .splits(jpaOptions.getSplits())
            .matching(jpaOptions.getMatching())
            .sections(jpaOptions.getSections())
            .build()
        )
        .hitSplitSentences(jpaHits.stream()
            .map(this::toHit)
            .toList()
        )
        .build();
  }

  public HitSplitSentences toHit(JpaHitSplitSentences jpa) {
    return HitSplitSentences.builder()
        .sentenceId(jpa.getSentenceId())
        .goodPick(jpa.isGoodPick())
        .timestamp(jpa.getTimestamp())
        .build();
  }


}
