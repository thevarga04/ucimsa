package ucimsa.stats;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ucimsa.learn.JpaOptionsSplitSentences;
import ucimsa.learn.OptionsSplitSentences;
import ucimsa.text.JpaHeapText;
import ucimsa.text.TextMapper;

@Component
public class StatsMapper {

  private final TextMapper textMapper;


  @Autowired
  public StatsMapper(TextMapper textMapper) {
    this.textMapper = textMapper;
  }


  public JpaHitSplitSentences toJpa(HitSplitSentences hit, int userId) {
    return JpaHitSplitSentences.builder()
        .userId(userId)
        .textId(hit.getTextId())
        .lessonId(hit.getLessonId())
        .sentence(hit.getSentence())
        .good(hit.isGood())
        .timestamp(hit.getTimestamp())
        .build();
  }


  public StatsSplitSentences toStatsList(
      JpaHeapText jpaHeapText
      , JpaOptionsSplitSentences jpaOptions
      , List<JpaHitSplitSentences> jpaHits
  ) {
    return StatsSplitSentences.builder()
        .heapText(textMapper.toHeapText(jpaHeapText))
        .options(toOptions(jpaOptions))
        .hitSplitSentences(jpaHits.stream()
            .map(this::toHit)
            .toList()
        )
        .build();
  }

  public OptionsSplitSentences toOptions(JpaOptionsSplitSentences jpa) {
    return OptionsSplitSentences.builder()
        .lessonId(jpa.getId())
        .coverage(jpa.getCoverage())
        .splits(jpa.getSplits())
        .matching(jpa.getMatching())
        .sections(jpa.getSections())
        .build();
  }

  public HitSplitSentences toHit(JpaHitSplitSentences jpa) {
    return HitSplitSentences.builder()
        .sentence(jpa.getSentence())
        .good(jpa.isGood())
        .timestamp(jpa.getTimestamp())
        .build();
  }


}
