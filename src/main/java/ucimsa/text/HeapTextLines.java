package ucimsa.text;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * id <br>
 * textname <br>
 * lines - Used to create or update one, UI does not need all the details <br>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeapTextLines {

  private int id;
  private String textname;
  private List<String> lines;

}
