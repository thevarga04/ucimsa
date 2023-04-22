package ucimsa.api.text;

import java.util.List;
import ucimsa.realm.UserValidatorException;

public interface TextService {

  List<HeapText> getTexts(String username) throws UserValidatorException;

  HeapText save(HeapText heapText, String username) throws UserValidatorException;
}
