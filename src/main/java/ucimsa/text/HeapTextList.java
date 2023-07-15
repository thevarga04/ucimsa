package ucimsa.text;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * id <br>
 * textname <br>
 * numberOfSentences - Used when providing a list of texts, UI needs just id, textname and number of sentences <br>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeapTextList {

  private int id;
  private String textname;
  private int numberOfSentences;

}
