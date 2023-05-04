package ucimsa.learn;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SplitSentencesOptions implements LearningOptions {

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
