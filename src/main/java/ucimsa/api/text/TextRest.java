package ucimsa.api.text;

import java.security.Principal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ucimsa.realm.UserValidatorException;

@RestController
@RequestMapping("/api/texts")
@Slf4j
public class TextRest {

  private final TextService textService;


  @Autowired
  public TextRest(TextService textService) {
    this.textService = textService;
  }


  @PostMapping("/heap")
  public ResponseEntity<HeapText> postHeap(HeapText heapText, Principal principal) throws UserValidatorException {
    final var savedText = textService.save(heapText, principal.getName());
    return ResponseEntity.ok(savedText);
  }

}
