package ucimsa.stats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ucimsa.learn.OptionsSplitSentences;
import ucimsa.text.HeapTextList;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatsSplitSentences {

  private HeapTextList heapTextList;
  private OptionsSplitSentences options;
  private List<HitSplitSentences> hitSplitSentences;

}
