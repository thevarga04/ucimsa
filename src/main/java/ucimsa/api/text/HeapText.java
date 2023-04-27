package ucimsa.api.text;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * id <br>
 * username <br>
 * textname <br>
 * sentences <br>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class HeapText {

  private int id;
  private String textname;
  private String sentences;


}
