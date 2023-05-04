package ucimsa.text;

import java.util.List;
import java.util.Optional;
import ucimsa.realm.UserRegistrationException;

public interface TextService {

  List<HeapText> getTexts(String username) throws UserRegistrationException;

  Optional<HeapText> getText(int textId, String username) throws UserRegistrationException;

  Optional<JpaHeapText> getJpaText(int textId, String username) throws UserRegistrationException;

  Integer deleteText(int textId, String username) throws UserRegistrationException;

  HeapText save(HeapText heapText, String username) throws UserRegistrationException;
}
