package ucimsa.learn;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
@EqualsAndHashCode(callSuper = true)
public class OptionsSplitSentences extends AbstractOptions {

  @Min(1)
  private int textId;

  @Min(10)
  @Max(100)
  private int coverage;

  @Min(3)
  @Max(10)
  private int splits;

  @Min(10)
  @Max(100)
  private int matching;

  @Min(2)
  @Max(4)
  private int sections;

}
