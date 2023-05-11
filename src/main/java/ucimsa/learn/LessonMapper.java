package ucimsa.learn;

import org.springframework.stereotype.Component;

@Component
public class LessonMapper {

  JpaLessonSplitSentences toJpa(LessonSplitSentences lessonSplitSentences, int userId) {
    return JpaLessonSplitSentences.builder()
        .id(lessonSplitSentences.options().getLessonId())
        .userId(userId)
        .textId(lessonSplitSentences.heapText().getId())
        .coverage(lessonSplitSentences.options().getCoverage())
        .splits(lessonSplitSentences.options().getSplits())
        .matching(lessonSplitSentences.options().getMatching())
        .sections(lessonSplitSentences.options().getSections())
        .build();
  }

}
