package ucimsa.learn;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import static ucimsa.common.ApplicationConstants.TEN;
import static ucimsa.common.ApplicationConstants.THOUSAND;

/**
 * textId <br>
 * coverage <br>
 * splits <br>
 * matching <br>
 * sections <br>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OptionsSplitSentences {

  private int lessonId;

  @Min(1)
  private int textId;

  /**
   * Per mille - ‰ of sentences a lesson is build from
   */
  @Min(TEN)
  @Max(THOUSAND)
  private int coverage;

  /**
   * Number of picks to choose from
   */
  @Min(3)
  @Max(10)
  private int splits;

  /**
   * Initial percentage of matching slices
   */
  @Min(10)
  @Max(100)
  private int matching;

  /**
   * Number of columns sentences are sliced into
   */
  @Min(2)
  @Max(4)
  private int sections;

}
