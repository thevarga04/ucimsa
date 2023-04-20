package ucimsa.api.text;

import ucimsa.realm.UserValidatorException;

public interface TextService {

  HeapText save(HeapText heapText, String username) throws UserValidatorException;
}
