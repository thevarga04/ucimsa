package ucimsa.stats;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ucimsa.learn.OptionsSplitSentences;
import ucimsa.text.HeapText;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatsSplitSentences {

  private HeapText heapText;
  private OptionsSplitSentences options;
  private List<HitSplitSentences> hitSplitSentences;

}
