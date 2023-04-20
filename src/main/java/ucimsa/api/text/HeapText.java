package ucimsa.api.text;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class HeapText {

  private int id;
  private String username;
  private String textname;
  private String sentences;


  public HeapText(String textname, String sentences) {
    this.textname = textname;
    this.sentences = sentences;
  }


}
