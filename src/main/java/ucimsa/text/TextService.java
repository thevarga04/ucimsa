package ucimsa.text;

import java.util.List;
import java.util.Optional;

public interface TextService {

  List<HeapText> getTextsList(String username);

  HeapText getText(int textId, String username, boolean asLines) throws TextNotFoundException;

  Optional<JpaHeapText> getJpaText(int textId, String username);

  Integer deleteText(int textId, String username);

  HeapText save(HeapText heapText, String username);
}
