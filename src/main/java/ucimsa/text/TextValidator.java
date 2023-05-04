package ucimsa.text;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ucimsa.realm.UserRegistrationException;

@Component
public class TextValidator {

  private final TextService textService;


  @Autowired
  public TextValidator(TextService textService) {
    this.textService = textService;
  }


  public void validateIfExistsAndIsAccessible(int textId, String username) throws UserRegistrationException {
    final var optionalJpaHeapText = textService.getJpaText(textId, username);
    if (optionalJpaHeapText.isEmpty()) {
      throw new IllegalArgumentException(
          "Either textId %d does not exists or is for %s inaccessible".formatted(textId, username)
      );
    }
  }


}
