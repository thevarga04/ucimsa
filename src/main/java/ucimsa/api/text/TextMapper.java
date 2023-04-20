package ucimsa.api.text;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.realm.UserRepo;
import ucimsa.realm.UserValidator;
import ucimsa.realm.UserValidatorException;

@Component
@Transactional
public class TextMapper {

  private final UserRepo userRepo;
  private final UserValidator userValidator;


  @Autowired
  public TextMapper(UserRepo userRepo, UserValidator userValidator) {
    this.userRepo = userRepo;
    this.userValidator = userValidator;
  }


  public JpaHeapText toJpaHeapText(HeapText heapText, String username) throws UserValidatorException {
    final var jpaUser = userRepo.findByUsername(username);
    userValidator.validateExists(jpaUser, username);

    return JpaHeapText.builder()
        .id(heapText.getId())
        .userId(jpaUser.getId())
        .name(heapText.getTextname())
        .sentences(heapText.getSentences())
        .build();
  }


}
