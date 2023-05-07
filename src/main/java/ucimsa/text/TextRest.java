package ucimsa.text;

import java.security.Principal;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/texts")
@Slf4j
public class TextRest {

  private final TextService textService;


  @Autowired
  public TextRest(TextService textService) {
    this.textService = textService;
  }


  @GetMapping
  public ResponseEntity<List<HeapText>> getTexts(Principal principal) {
    final var texts = textService.getTextsList(principal.getName());
    return ResponseEntity.ok(texts);
  }


  @GetMapping("/heapText/{textId}")
  public ResponseEntity<HeapText> getHeapText(@PathVariable("textId") int textId, Principal principal) throws TextNotFoundException {
    final var text = textService.getText(textId, principal.getName(), true);
    return ResponseEntity.ok(text);
  }

  @DeleteMapping("/heapText/{textId}")
  public ResponseEntity<Integer> deleteHeapText(@PathVariable("textId") int textId, Principal principal) {
    final var deleted = textService.deleteText(textId, principal.getName());
    return ResponseEntity.ok(deleted);
  }


  @PostMapping("/heapText")
  public ResponseEntity<HeapText> postHeapText(HeapText heapText, Principal principal) {
    final var savedText = textService.save(heapText, principal.getName());
    return ResponseEntity.ok(savedText);
  }

}
