package ucimsa.stats;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HitSplitSentences {

  @Min(1)
  private int textId;

  @Min(1)
  private int lessonId;

  @Min(1)
  private int sentenceId;

  private boolean goodPick;

  private long timestamp;

}
