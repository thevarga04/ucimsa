package ucimsa.text;

import java.util.List;
import java.util.Optional;

public interface TextService {

  List<HeapTextList> getTextsList(String username);

  HeapText getText(int textId, String username) throws TextNotFoundException;

  HeapTextLines getTextLines(int textId, String username) throws TextNotFoundException;

  Optional<JpaHeapText> getJpaText(int textId, String username);

  Integer deleteText(int textId, String username);

  HeapText save(HeapTextLines heapTextLines, String username);

}
