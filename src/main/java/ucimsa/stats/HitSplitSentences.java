package ucimsa.stats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HitSplitSentences {

  private int textId;
  private int lessonId;
  private String sentence;
  private boolean good;
  private long timestamp;

}
