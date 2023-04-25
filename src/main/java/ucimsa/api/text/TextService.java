package ucimsa.api.text;

import java.util.List;
import java.util.Optional;
import ucimsa.realm.UserValidatorException;

public interface TextService {

  List<HeapText> getTexts(String username) throws UserValidatorException;

  Optional<HeapText> getText(int id, String username) throws UserValidatorException;

  Integer deleteText(int id, String username) throws UserValidatorException;

  HeapText save(HeapText heapText, String username) throws UserValidatorException;
}
