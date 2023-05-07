package ucimsa.text;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * id <br>
 * textname <br>
 * lines - Used to create or update one, UI does not need all the details <br>
 * sentences - Used when learning (to record sentence grained stats) <br>
 * numberOfSentences - Used when providing a list of texts, UI needs just id, textname and number of sentences <br>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeapText {

  private int id;
  private String textname;
  private List<String> lines;
  private List<Sentence> sentences;
  private int numberOfSentences;


  /**
   * Create or update: always replace all the sentences. <br>
   * To analyze which sentences has changed is too costly.
   */
  public HeapText(int id, String textname, List<String> lines) {
    this.id = id;
    this.textname = textname;
    this.lines = lines;
  }


}
