package ucimsa.text;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * id <br>
 * textname <br>
 * sentences - Used when learning (to record sentence grained stats) <br>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeapText {

  private int id;
  private String textname;
  private List<Sentence> sentences;

}
